import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 350
  },
  cardContentStyle: {
    paddingBottom: 4,
  }
})

const BlogForm = ({ setTabValue }) => {
  const classes = useStyle()
  const history = useHistory()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const pinBlog = async (event) => {
    event.preventDefault()
    try {
      const blogEntry = {
        title: title,
        url: url,
        author: author
      }
      const newBlog = await blogService.create(blogEntry)
      dispatch(addNewBlog(newBlog))
      dispatch(setNotification(`New blog ${newBlog.title} by ${newBlog.author} pinned`, false))
      setTimeout(() => {
        dispatch(setNotification(null, false))
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTabValue(0)
      history.push('/collection')
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom color="secondary">
          pin new blog
        </Typography>
        <Card className={classes.cardStyle} variant="outlined">
          <form
          data-test-id="form"
            onSubmit={pinBlog}>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                data-test-id="title"
                fullWidth
                name="title"
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                label="title"
                variant="outlined">
              </TextField>
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                data-test-id="author"
                fullWidth
                name="author"
                type='text'
                value={author}
                label="author"
                variant="outlined"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                data-FormHelperTextProps-id="url"
                fullWidth
                name="url"
                type="url"
                value={url}
                label="link"
                variant="outlined"
                onChange={({ target }) => setUrl(target.value)}
              />
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <Button
                data-test-id="create-button"
                fullWidth
                variant="contained"
                color="primary"
                type="submit">
                pin
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid >
    </div>
  )
}

export default BlogForm