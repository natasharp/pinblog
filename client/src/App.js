import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { makeStyles, Tab, Tabs, Paper } from '@material-ui/core'
import { Switch, Route, Link, useHistory } from "react-router-dom"
import BlogCards from './components/BlogCards'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  gridStyle: {
    paddingTop: 8
  }
});

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tabValue, setTabValue] = React.useState(0);
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      history.push('/blogs')
    } catch (error) {
      setNotificationMessage('wrong credentials')
      setIsSuccess(false)
      setTimeout(() => {
        setNotificationMessage(null)
        setIsSuccess(null)
      }, 5000)

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
    setTabValue(0)
  }

  const pinBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog),
          setNotificationMessage(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          ),
          setIsSuccess(true),
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        )
      }).catch(error => {
        console.log(error)
      })
  }

  const updateBlog = (id, updatedBlog) => {
    blogService.update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => { console.log(error) })
  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(setBlogs(blogs.filter(blog => blog.id !== id)))
      .catch(error => { console.log(error) })
  }

  if (user === null) {
    return (
      <div>
        <LoginForm login={handleLogin} />
        <Notification
          message={notificationMessage}
          success={isSuccess} />
      </div>
    )
  }

  return (

    <div>
      <Paper className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="pined" component={Link} to={"/blogs"} />
          <Tab label="pin new" component={Link} to={"/new"} />
          <Tab label="logout" component={Link} onClick={handleLogout} to={"/login"} />
        </Tabs>
      </Paper>
      <Switch>
        <Route path="/blogs" render={() => <BlogCards blogs={blogs} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />} />
        <Route path="/new" render={() => <BlogForm  pinBlog={pinBlog}/>} />
        <Route path="/login" render={() => <LoginForm />} />
      </Switch>
      <Notification
        message={notificationMessage}
        success={isSuccess} />
    </div>
  )
}

export default App