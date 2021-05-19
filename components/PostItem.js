import PropTypes from 'prop-types'
import React from 'react'

const PostItem = ({ data }) => {
  const post = data
  console.log(data)
  return (
    <>
      <button className="w-100 card mb-2 px-0" key={post.id}>
        <div className="card-header">{post.title}</div>
      </button>
    </>
  )
}

PostItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

PostItem.defaultProps = {
  data: ``,
}

export default PostItem
