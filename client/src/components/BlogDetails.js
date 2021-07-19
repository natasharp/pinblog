import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogDetails = ({ blog, user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const deleteButton = {
    backgroundColor: '#5F9EA0',
    display: blog.user.username === user.username ? '' : 'none'
  }

  const handleDelete = async () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      await blogService.remove(blog.id)
      history.push('/')
      dispatch(deleteBlog(blog.id))  
    }
  }

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      comments: blog.comments,
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div >{blog.title}
        <span>&nbsp;</span>
        {blog.author}
        <span>&nbsp;</span>
      </div>
      <div>{blog.url}</div>
      <div id="likes-div">{blog.likes}
        <span>&nbsp;</span>
        <button onClick={() => handleLike(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      <button id="delete-button" style={deleteButton} onClick={() => handleDelete(blog)}>remove</button>
    </div>
  )
}

export default BlogDetails
