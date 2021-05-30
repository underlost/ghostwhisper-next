import PropTypes from 'prop-types'
import React, { useState } from 'react'
import GhostAdminAPI from '@tryghost/admin-api'
import PostItem from './PostItem'
import { getCurrentUser } from '../util/storage'

const PostsList = ({ pageNumber }) => {
  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI

  const [posts, setPosts] = useState([])
  const [currentPageState, setcurrentPageState] = useState(pageNumber)

  const api = new GhostAdminAPI({
    url: siteName,
    key: siteAPI,
    version: `v3`,
  })
  api.posts
    .browse({
      limit: 5,
      page: currentPageState,
      filter: `tag:hash-aside`,
    })
    .then((postsData) => {
      //console.log(posts)
      setPosts(postsData)
    })
    .catch((err) => {
      console.error(err)
    })

  return (
    <>
      {posts.map((obj) => (
        <PostItem data={obj} key={obj.id} />
      ))}
      Current Page: {currentPageState}
      <div className="row">
        <div className="col-6">
          <button className="btn btn block btn-primary btn-block" onClick={() => setcurrentPageState((prevState) => prevState - 1)}>
            Previous
          </button>
        </div>
        <div className="col-6">
          <button className="btn btn block btn-primary btn-block" onClick={() => setcurrentPageState((prevState) => prevState + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

PostsList.propTypes = {
  pageNumber: PropTypes.integer,
}

PostsList.defaultProps = {
  pageNumber: 1,
}

export default PostsList
