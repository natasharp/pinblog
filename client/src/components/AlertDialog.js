import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { deleteBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

export default function AlertDialog({ blog, handleClose, open }) {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    await blogService.remove(blog.id)
    history.push('/collection')
    dispatch(deleteBlog(blog.id))
  }


  return (
    <div>
      <Dialog
        data-test-id="alert"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to remove your pin ${blog.title} by ${blog.author} from blog collection?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleDelete(blog)} color="secondary">
            YES
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary" autoFocus>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}