import React, { useState } from 'react'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 250,
    paddingBottom: 8
  },
  cardContentStyle: {
    paddingBottom: 4,
  }
});

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const classes = useStyle()
  const [details, setDetails] = useState('')

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
      <div className='blogDetails'>
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
      <Card className={classes.cardStyle}>
        <CardContent className={classes.cardContentStyle}>
          {blog.title}
        </CardContent>
        <CardContent className={classes.cardContentStyle}>
          {blog.author}
        </CardContent>
        <CardContent className={classes.cardContentStyle}>
          <Button id="view-button" onClick={handleClick}>view</Button>
        </CardContent>
      </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
