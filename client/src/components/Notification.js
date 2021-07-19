import React from 'react'
import Alert from '@material-ui/lab/Alert';

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null
  }

  if (isError) {
    return <Alert severity="error"> {message}</Alert>
  }

  return <Alert severity="success">{message}</Alert>
}

export default Notification
