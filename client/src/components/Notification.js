import React from 'react'
import Alert from '@material-ui/lab/Alert'

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null
  }

  if (isError) {
    return <Alert data-test-id='error' severity='error'> {message}</Alert>
  }

  return <Alert data-test-id='notification' severity='success'>{message}</Alert>
}

export default Notification
