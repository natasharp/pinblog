import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card, CardContent, CardHeader, CardActions, IconButton, makeStyles, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import LaunchIcon from '@material-ui/icons/Launch';
import AlertDialog from './AlertDialog';

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 250
  },
  cardHeaderStyle: {
    backgroundColor: "#e4eaf7",
    color: "#f82257"
  },
  iconButtonStyle: {
    paddingLeft: 5,
    paddingRight: 5
  }
});

const BlogCard = ({ blog, user }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <CardHeader
        className={classes.cardHeaderStyle}
        avatar={
          <Avatar aria-label="user">
            {blog.user.name.charAt(0)}
          </Avatar>}
        title={blog.title}
        subheader={`by ${blog.author}`} />
      <CardContent className={classes.cardContentStyle}>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end">
          <CardActions disableSpacing>
            <Box flexwrap="wrap">
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
              <AlertDialog blog={blog} handleClose={handleClose} open={open}/>
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