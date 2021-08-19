import React from 'react'
import Alert from '@material-ui/lab/Alert'

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null
  }

  if (isError) {
    return <Alert data-cypress-id='error' severity='error'> {message}</Alert>
  }

  return <Alert data-cypress-id='notification' severity='success'>{message}</Alert>
}

export default Notification
