import React, { useState } from "react"
import GhostAdminAPI from "@tryghost/admin-api"
import ReactMde from "react-mde"
import dayjs from "dayjs"
import * as Showdown from "showdown"
import { getCurrentUser } from "../util/storage"
import path from "path"
import Toast from "react-bootstrap/Toast"
import axios from "axios"

const CreatePost = () => {
  const dateTile = dayjs().format(`ddd, MMM D, YYYY h:mm A`)
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI
  const [PostTitleState, setPostTitleState] = useState(dateTile)
  const [PostContentState, setPostContentState] = useState(``)
  const [PostLinkState, setPostLinkState] = useState(``)
  const [showToast, setShowToast] = useState(false)
  const [selectedTab, setSelectedTab] = useState(`write`)
  const [bookmarkCard, setBookmarkCard] = useState(``)

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  const api = new GhostAdminAPI({
    url: siteName,
    key: siteAPI,
    version: `v3`,
  })

  //console.log(siteName)
  //console.log(siteAPI)

  // Utility function to find and upload any images in an HTML string
  function processImagesInHTML(html) {
    // Find images that Ghost Upload supports
    let imageRegex = /="([^"]*?(?:\.jpg|\.jpeg|\.gif|\.png|\.svg|\.sgvz))"/gim
    let imagePromises = []
    let result
    while ((result = imageRegex.exec(html)) !== null) {
      let file = result[1]
      // Upload the image, using the original matched filename as a reference
      imagePromises.push(
        api.images.upload({
          ref: file,
          file: path.resolve(file),
        })
      )
    }
    return Promise.all(imagePromises).then((images) => {
      images.forEach((image) => (html = html.replace(image.ref, image.url)))
      return html
    })
  }

  async function previewLinkPost(url) {
    const requestOptions = {
      headers: {
        "Content-Type": `application/json`,
        Accept: `application/json`,
      },
    }
    const body = JSON.stringify({ url })
    const response = await axios.post(`/api/getlinkpreview`, body, requestOptions)
    return response.data
    
  }

  const handleLinkPreview = (event) => {
    event.preventDefault()

    // Get link preview data from previewLinkPost API
    if (PostLinkState !== ``) {
      previewLinkPost(PostLinkState).then((res) => {
        console.log(res)
        // Set the bookmark card
        setBookmarkCard(
          `<div class="bookmark-card">
            <a href="${res.url}" target="_blank" rel="noopener noreferrer">
              <div class="bookmark-card__image">
                <img src="${res.image}" alt="${res.title}" />
              </div>
              <div class="bookmark-card__content">
                <h3 class="bookmark-card__title">${res.title}</h3>
                <p class="bookmark-card__description">${res.description || ``}</p>
              </div>
            </a>
          </div>`
        )
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let title = PostTitleState
    let html = PostContentState

    let mobiledoc = JSON.stringify({
      version: `0.3.1`,
      markups: [],
      atoms: [],
      cards: [
        [`html`, { html: html }],
        [`html`, { html: bookmarkCard }],
      ],
      sections: [
        [10, 0],
        [10, 1],
      ],
    })

    processImagesInHTML(html)
      .then(
        api.posts
          .add({
            title: title,
            tags: [`#aside`],
            mobiledoc: mobiledoc,
            status: `published`,
          })
          .then((res) => console.log(JSON.stringify(res)))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))

    setShowToast(true)
    setPostTitleState(``)
    setPostContentState(``)
  }

  return (
    <>
      <ReactMde
        value={PostContentState}
        onChange={setPostContentState}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />

      <div className="row  pt-3">
        <div className="col-8">
          <div className="form-group">
            <label className={`label d-block`}>
              <span className="sr-only">Title</span>
              <input
                className="form-control form-control-subtle px-0"
                type="text"
                placeholder="Title (optional)"
                name="title"
                value={PostTitleState}
                onChange={(event) => setPostTitleState(event.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label className={`label d-block`}>
              <span className="sr-only">Link</span>
              <input
                className="form-control form-control-subtle px-0"
                type="text"
                placeholder="Link (optional)"
                name="link"
                value={PostLinkState}
                onChange={(event) => setPostLinkState(event.target.value)}
                onBlur={handleLinkPreview}
              />
            </label>

            {bookmarkCard !== `` && (
              <div dangerouslySetInnerHTML={{ __html: bookmarkCard }}></div>
            )}
          </div>
        </div>
        <div className="col-4">
          <button className="btn btn-primary btn-block w-full uppercase" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
      <div
        style={{
          position: `absolute`,
          bottom: `20px`,
          right: `20px`,
        }}
      >
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Notice</strong>
          </Toast.Header>
          <Toast.Body>A new post was sucessfully created.</Toast.Body>
        </Toast>
      </div>
    </>
  )
}

export default CreatePost
