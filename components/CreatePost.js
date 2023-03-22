import React, { useState } from "react"
import GhostAdminAPI from "@tryghost/admin-api"
import ReactMde from "react-mde"
import dayjs from "dayjs"
import * as Showdown from "showdown"
import { getCurrentUser } from "../util/storage"
import path from "path"
import Toast from "react-bootstrap/Toast"
import AddLink from "./AddLink"

const CreatePost = () => {
  const currentDate = dayjs().format(`ddd, MMM D, YYYY h:mm A`)
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI

  // Set States
  const [posts, setPosts] = useState([])
  const [PostIDState, setPostIDState] = useState(null)
  const [currentPost, setcurrentPost] = useState([])
  const [PostTitleState, setPostTitleState] = useState(``)
  const [PostContentState, setPostContentState] = useState(``)
  const [PostLinkState, setPostLinkState] = useState(``)
  const [showToast, setShowToast] = useState(false)
  const [selectedTab, setSelectedTab] = useState(`write`)
  const [bookmarkCard, setBookmarkCard] = useState(``)
  const [updatingPost, setUpdatingPost] = useState(false)

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  const api = new GhostAdminAPI({
    url: siteName,
    key: siteAPI,
    version: `v5.0`,
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

  const handleSetTitleTime = (event) => {
    event.preventDefault()
    setPostTitleState(currentDate)
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
            tags: [`#live`],
            mobiledoc: mobiledoc,
            status: `draft`,
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
      <div className="form-group grid grid-cols-12 gap-4">
        <div className="col-span-10">
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
        <div className="col-span-2">
          <button className="btn btn-primary btn-block w-full uppercase" onClick={handleSetTitleTime} title="Set Title based on time">
            Time
          </button>
        </div>
      </div>
      
      <ReactMde
        value={PostContentState}
        onChange={setPostContentState}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />

      <div className="pt-3">
        <div>
          <AddLink setPostLinkState={setPostLinkState} PostLinkState={PostLinkState} setBookmarkCard={setBookmarkCard} bookmarkCard={bookmarkCard} />
        </div>
        <div>
          <button className="btn btn-primary btn-block w-full uppercase" onClick={handleSubmit}>
            Create Post
          </button>
        </div>
      </div>
      <div
        style={{
          position: `absolute`,
          bottom: `20px`,
          right: `20px`,
        }}>
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
