import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
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

  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

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

  const sortBlogs = blogs => (
    blogs.sort((first, second) => (first.likes > second.likes) ? -1 : 1)
  )


  if (user === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage}
        success={isSuccess} />
      <div>{user.name} is logged in
        <button id="logout-button" onClick={handleLogout}>logout</button>
      </div>
      <br />
      {blogForm()}
      <div id="blogs-div">
        {sortBlogs(blogs).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App