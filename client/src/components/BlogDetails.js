import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, user, handleClick, handleLike, handleDelete }) => {

  const deleteButton = {
    backgroundColor: '#5F9EA0',
    display: blog.user.username === user.username ? '' : 'none'
  }

  return (
    <div>
      <div >{blog.title}
        <span>&nbsp;</span>
        {blog.author}
        <span>&nbsp;</span>
        <button onClick={handleClick}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div id="likes-div">{blog.likes}
        <span>&nbsp;</span>
        <button onClick={handleLike}>like</button></div>
      <div>{blog.user.name}</div>
      <button id="delete-button" style={deleteButton} onClick={handleDelete}>remove</button>
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogDetails
