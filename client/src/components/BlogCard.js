import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, CardHeader, CardActions, IconButton, makeStyles, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import LaunchIcon from '@material-ui/icons/Launch'
import AlertDialog from './AlertDialog'
import Comment from './Comment'

const useStyle = makeStyles({
  cardStyle: {
    backgroundColor: '#ffffff',
    minWidth: 250,
  },
  cardHeaderStyle: {
    backgroundColor: '#e4eaf7',
    color: '#f82257',
    border: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    borderColor: '#e4eaf7'
  },
  commentStyle: {
    backgroundColor: '#f9ffe5',
    color: 'text.secondary',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  iconButtonStyle: {
    paddingLeft: 5,
    paddingRight: 5
  },
  textFieldStyle: {
    paddingTop: 5,
    paddingBottom: 5
  }
})

const BlogCard = ({ blog, user }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLike = async (blog) => {
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
    <Card data-test-id="blog-card" className={classes.cardStyle}>
      <CardHeader
        data-test-id="card-header"
        className={classes.cardHeaderStyle}
        avatar={
          <Avatar aria-label="user">
            {blog.user.name.charAt(0)}
          </Avatar>}
        title={blog.title}
        subheader={`by ${blog.author}`} />
      <CardContent
        data-test-id="card-content"
        className={classes.cardContentStyle}>
        <Comment blog={blog} />
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end">
          <CardActions disableSpacing>
            <Box
              data-test-id="number-of-likes"
              flexwrap="wrap">
              {blog.likes}
              <IconButton className={classes.iconButtonStyle} aria-label="like" color="primary" onClick={() => handleLike(blog)}>
                <FavoriteTwoToneIcon fontSize="small" />
              </IconButton >
            </Box>
            <IconButton className={classes.iconButtonStyle} aria-label="launch" color="primary" href={blog.url} target="_blank">
              <LaunchIcon fontSize="small" />
            </IconButton>
            {blog.user.username === user.username
              ? <IconButton className={classes.iconButtonStyle} aria-label="delete" color="primary" onClick={handleClickOpen}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              : <IconButton className={classes.iconButtonStyle} aria-label="delete" disabled color="primary">
                <DeleteIcon fontSize="small" />
              </IconButton>}
            <AlertDialog data-test-id="delete-dialog" blog={blog} handleClose={handleClose} open={open} />
          </CardActions>
        </Box>
      </CardContent>
    </Card >
  )
}

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogCard