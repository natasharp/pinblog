import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'

const useStyle = makeStyles({
    cardStyle: {
        minWidth: 350
    },
    cardContentStyle: {
        paddingBottom: 4,
    }
});

const LoginForm = ({ login }) => {
    const classes = useStyle()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        login(username, password)
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
            </Card>
        </Grid >
    )
}

export default LoginForm