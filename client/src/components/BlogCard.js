import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, CardHeader, CardActions, IconButton, makeStyles, Paper, Box } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 250
  },
  paperStyle: {
    backgroundColor: "#ffebee"
  }
});

const BlogCard = ({ blog, user }) => {
  const classes = useStyle()
  const history = useHistory()
  const dispatch = useDispatch()

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

  return (
    <Card className={classes.cardStyle}>
      <Paper className={classes.paperStyle} elevation={0}>
        <CardHeader
          avatar={
            <Avatar aria-label="user">
              {blog.user.name.charAt(0)}
            </Avatar>
          }
          title={blog.title}
          subheader={`by ${blog.author}`} />
      </Paper>
      <CardContent className={classes.cardContentStyle}>
        {blog.likes}
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end">
          <CardActions disableSpacing>
            <IconButton aria-label="like" color="primary" onClick={() => handleLike(blog)}>
              <FavoriteTwoToneIcon />
            </IconButton>
            <IconButton aria-label="launch" color="primary" component={Link} to={`/blogs/${blog.id}`}>
              <LaunchIcon />
            </IconButton>
            {blog.user.username === user.username
              ? <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(blog)}>
                <DeleteIcon />
              </IconButton>
              : <IconButton aria-label="delete" disabled color="primary" >
                <DeleteIcon />
              </IconButton>}
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  )
}

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogCard
