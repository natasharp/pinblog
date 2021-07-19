import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setNotification } from '../reducers/notificationReducer';
import { setLoggedInUser } from '../reducers/userReducer'
import Notification from './Notification';


const useStyle = makeStyles({
    cardStyle: {
        minWidth: 350
    },
    cardContentStyle: {
        paddingBottom: 4,
    }
});

const LoginForm = ({ notification }) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username,
                password: password,
            })
            window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setLoggedInUser(user))
            history.push('/')
        } catch (error) {
            dispatch(setNotification('wrong credentials', true))
            setTimeout(() => {
                dispatch(setNotification(null, false))
            }, 5000)
        }
    }

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <Typography variant="h6" gutterBottom color="secondary">
                pinblog
            </Typography>
            <Card className={classes.cardStyle} variant='outlined'>
                <form onSubmit={submit}>
                    <CardContent className={classes.cardContentStyle}>
                        <TextField
                            fullWidth
                            name='Username'
                            type='text'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            label='username'
                            variant='outlined'>
                        </TextField>
                    </CardContent>
                    <CardContent className={classes.cardContentStyle}>
                        <TextField
                            fullWidth
                            name='Password'
                            type='password'
                            value={password}
                            label='password'
                            variant='outlined'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </CardContent>
                    <CardContent className={classes.cardContentStyle}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            type='submit'>
                            LOGIN
                        </Button>
                    </CardContent>
                </form>
                {notification ? <Notification message={notification.message} isError={notification.isError} /> : null}
            </Card>
        </Grid >
    )
}

export default LoginForm