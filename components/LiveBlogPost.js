import React, { useState, useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import GhostAdminAPI from '@tryghost/admin-api'
import ReactMde from 'react-mde'
import dayjs from 'dayjs'
import * as Showdown from 'showdown'
import { getCurrentUser } from '../util/storage'
import path from 'path'
import Toast from 'react-bootstrap/Toast'
import { getPosts } from '../lib/posts'

export default function LiveBlogPost() {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI
  const [PostContentState, setPostContentState] = useState(``)
  const [PostIDState, setPostIDState] = useState(``)
  const [showToast, setShowToast] = useState(false)
  const [selectedTab, setSelectedTab] = useState(`write`)
  const [currentPost, setcurrentPost] = useState([])
  const [displayState, setDisplayState] = useState(``)
  const [posts, setPosts] = useState([])
  const currentTime = dayjs()
  const currentTimeReadable = dayjs().format(`YYYY h:mm A (MMM D)`)

  useEffect(() => {
    getPosts().then((data) => setPosts(data))
  }, [])
  ///console.log(posts)

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

  function getLatestUpdate() {
    api.posts
      .read({
        id: PostIDState,
        formats: `html`,
      })
      .then((postsData) => {
        setcurrentPost(postsData)
        setDisplayState(postsData.html)
        //console.log(displayState)
      })
      .catch((err) => console.log(err))
  }

  const handlePostLookup = (event) => {
    event.preventDefault()
    getLatestUpdate()
  }

  const postedHTML = (
    <div className="liveEntryUpdate">
      <div className="liveEntryDatetime">
        <time dateTime={currentTime}>{currentTimeReadable}</time>
      </div>
      <div className="liveEntryContent">{PostContentState}</div>
    </div>
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getLatestUpdate()
    let combinedHTML = currentPost.html + renderToString(postedHTML)
    //console.log(combinedHTML)
    let title = currentPost.title
    let updatedAt = currentPost.updated_at
    let html = combinedHTML
    let id = PostIDState

    let mobiledoc = JSON.stringify({
      version: `0.3.1`,
      markups: [],
      atoms: [],
      cards: [
        [
          `html`,
          {
            cardName: `html`,
            html: html,
          },
        ],
      ],
      sections: [[10, 0]],
    })

    processImagesInHTML(html)
      .then(
        api.posts
          .edit({
            id: id,
            title: title,
            updated_at: updatedAt,
            mobiledoc: mobiledoc,
          })
          .then((res) => console.log(JSON.stringify(res)))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))
    setShowToast(true)
    setPostContentState(``)
    setDisplayState(combinedHTML)
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          handlePostLookup(event)
        }}>
        <div className="form-group mb-4">
          <div className="row">
            <div className="col-8">
              <select className="form-select" aria-label="Choose Post" onChange={(event) => setPostIDState(event.target.value)}>
                <option value="">Select Post</option>
                {posts.map((obj) => (
                  <option value={obj.id} key={obj.id}>
                    {obj.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <button className="btn btn-primary w-100">Select</button>
            </div>
          </div>
        </div>
      </form>

      <hr />

      <ReactMde
        value={PostContentState}
        onChange={setPostContentState}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />

      <div className="row pt-3">
        <div className="col-12">
          <form
            className={`form`}
            method="post"
            onSubmit={(event) => {
              handleSubmit(event)
            }}>
            <div className="text-right">
              <input className="btn btn-primary btn-block text-uppercase w-100" type="submit" value="Post" />
            </div>
          </form>
        </div>
      </div>

      <div className="pt-4 post-content" dangerouslySetInnerHTML={{ __html: displayState }}></div>
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
