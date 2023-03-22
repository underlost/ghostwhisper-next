
import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

const AddLink = ({ PostLinkState, setPostLinkState, bookmarkCard, setBookmarkCard }) => {
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
          `<figure class="kg-card kg-bookmark-card mb-4">
            <a class="kg-bookmark-container" href="${res.url}">
              <div class="kg-bookmark-content">
                <div class="kg-bookmark-title">${res.title}</div>
                <div class="kg-bookmark-description">${res.description || ``}</div>
              </div>
              <div class="kg-bookmark-thumbnail">
                <img src="${res.image}" alt="${res.title}" />
              </div>
            </a>
          </figure>`
        )
      })
    }
  }

  return (
    <>
      <div className="form-group grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <label className="label d-block">
            <span className="sr-only">Link</span>
            <input
              className="form-control form-control-subtle px-0"
              type="text"
              placeholder="Link (optional)"
              name="link"
              value={PostLinkState}
              onChange={(event) => setPostLinkState(event.target.value)}
            />
          </label>
        </div>
        <div className="col-span-4">
          <button className="btn btn-primary btn-block w-full uppercase" onClick={handleLinkPreview} disabled={PostLinkState === ``} title="Get Link preview">
            Preview
          </button>
        </div>
      </div>
      {bookmarkCard !== `` && <div dangerouslySetInnerHTML={{ __html: bookmarkCard }}></div>}
    </>
  )
}

export default AddLink

AddLink.propTypes = {
  PostLinkState: PropTypes.string,
  setPostLinkState: PropTypes.func,
  bookmarkCard: PropTypes.string,
  setBookmarkCard: PropTypes.func,
}