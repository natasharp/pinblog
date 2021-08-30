import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { TextField, Box, makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography, InputAdornment, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddBoxIcon from '@material-ui/icons/AddBox'


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  commentStyle: {
    backgroundColor: '#f9ffe5',
    color: 'text.secondary',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  accordionStyle: {
    padding: 3,
    margin: 1,
    borderRadius: 3
  },
  heading: {
    fontSize: theme.typography.pxToRem(13.5),
  },
  gridStyle: {
    flexGrow: 1
  },
  textFieldStyle: {
    paddingRight: '2px',
  },
  iconButtonStyle: {
    padding: 0
  }
}))

const Comment = ({ blog }) => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (e) => {
    e.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    blogService
      .createComment(blog.id, updatedBlog)
      .then((returnedBlog) => dispatch(commentBlog(returnedBlog)))
      .catch((error) => {
        console.log(error)
      })
    setComment('')
  }

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordionStyle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon fontSize='small' />}
          aria-controls="panel1c-content"
          id="panel1c-header">
          <Typography className={classes.heading} color='textSecondary'>add new comment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={addComment}>
            <TextField
              className={classes.textFieldStyle}
              data-test-id="comment"
              size="small"
              fullWidth
              multiline
              name="comment"
              type='text'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton className={classes.iconButtonStyle} aria-label="add" color="primary" type='submit'>
                    <AddBoxIcon fontSize="small" /></IconButton>
                </InputAdornment>,
              }} />
          </form>
        </AccordionDetails>
      </Accordion>
      <Box>{blog.comments
        ? (<div>{blog.comments.map((comment, i) => (
          <Box
            className={classes.commentStyle}
            color="text.secondary"
            border={1}
            borderColor="grey.300"
            borderRadius={5}
            key={i}
          >{comment}
          </Box>
        ))}</div>)
        : (<div>null</div>)}
      </Box>
    </div>
  )
}

export default Comment