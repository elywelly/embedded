import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';

const theme = createTheme();

export default function Login() {
    const history = useHistory();

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorDisplay, seterrorDisplay] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            username: data.get('username'),
            password: data.get('password'),
        };

        let error = null;
        if (body.username === '') {
            setUsernameError(true);
            seterrorDisplay('Username is required');
            error = 'error';
        } else if (body.password === '') {
            setPasswordError(true);
            seterrorDisplay('Password is required');
            error = 'error';
        }

        if (!error) {
            const newUserSession = async () => {
                try {
                    const response = await axios.post(`/api/sessions/`, body);
                } catch (err: any) {
                    seterrorDisplay(err.response.data.message);
                }
            };
            newUserSession();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        gutterBottom
                        component='div'>
                        {errorDisplay}
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}>
                        <TextField
                            error={usernameError}
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            autoFocus
                            onChange={() => {
                                seterrorDisplay('');
                                setUsernameError(false);
                            }}
                        />
                        <TextField
                            error={passwordError}
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={() => {
                                seterrorDisplay('');
                                setPasswordError(false);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value='remember' color='primary' />
                            }
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}>
                            Login
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='#' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
