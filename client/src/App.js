import React, { useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { makeStyles, Tab, Tabs, Paper, Card, Container } from '@material-ui/core'
import { Switch, Route, Link } from 'react-router-dom'
import BlogCollection from './components/BlogCollection'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from './reducers/userReducer'
import Notification from './components/Notification'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  gridStyle: {
    paddingTop: 8
  },
  cardStyle: {
    marginTop: 8,
    marginBottom: 8
  },
  cardContentStyle: {
    paddingBottom: 4,
  }
})

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const [tabValue, setTabValue] = React.useState(0)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch(setLoggedInUser(null))
    setTabValue(0)
  }
  if (!user) {
    return (
      <div>
        <LoginForm notification={notification} />
      </div>
    )
  }

  return (
    <Container>
      <Paper className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered>
          <Tab label='pinned' component={Link} to={'/collection'} />
          <Tab label='pin new' component={Link} to={'/new'} />
          <Tab label='logout' component={Link} onClick={handleLogout} to={'/'} />
        </Tabs>
      </Paper>
      <Card className={classes.cardStyle}>
        {notification ? <Notification
          message={notification.message}
          success={notification.isSuccess} /> : null}
      </Card>
      <Switch>

        <Route path='/new' render={() => <BlogForm notification={notification} setTabValue={setTabValue} />} />
        <Route path='/collection' render={() => <BlogCollection blogs={blogs} user={user} />} />
        <Route path='/' render={() => <LoginForm />} />
      </Switch>
    </Container>
  )
}

export default App