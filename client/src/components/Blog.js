import React, { useState } from 'react'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [details, setDetails] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = () => {
    setDetails(!details)
  }

  const handleLike = () => {
    const blogToUpdate = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url
    }

    updateBlog(blog.id, blogToUpdate)
  }

  const handleDelete = () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      deleteBlog(blog.id)
    }
  }

  if (details === true) {
    return (
      <div style={blogStyle} className='blogDetails'>
        <BlogDetails
          blog={blog}
          user={user}
          handleClick={handleClick}
          handleLike={handleLike}
          handleDelete={handleDelete} />
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <span>&nbsp;</span>
      <button id="view-button" onClick={handleClick}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
