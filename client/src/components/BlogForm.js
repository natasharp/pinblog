import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 350
  },
  cardContentStyle: {
    paddingBottom: 4,
  }
});

const BlogForm = ({ pinBlog }) => {
  const classes = useStyle()
  const history = useHistory();
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogEntry = {
      title: title,
      url: url,
      author: author
    }
    pinBlog(blogEntry)
    setTitle('')
    setAuthor('')
    setUrl('')
    history.push('/blogs')
  }

  return (
    <div>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom color="secondary">
          pin new blog
        </Typography>
        <Card className={classes.cardStyle} variant='outlined'>
          <form onSubmit={addBlog}>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                fullWidth
                name='title'
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                label='title'
                variant='outlined'>
              </TextField>
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                fullWidth
                name='author'
                type='text'
                value={author}
                label='author'
                variant='outlined'
                onChange={({ target }) => setAuthor(target.value)}
              />
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <TextField
                fullWidth
                name='url'
                type='url'
                value={url}
                label='link'
                variant='outlined'
                onChange={({ target }) => setUrl(target.value)}
              />
            </CardContent>
            <CardContent className={classes.cardContentStyle}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                type='submit'>
                pin
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid >
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm