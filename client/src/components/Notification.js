import React from 'react'

const Notification = ({ message, success }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  if (success === true) {
    return (
      <div className="notification" style={notificationStyle}>
        {message}
      </div>
    )
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification