import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from 'react';
import ApplicationContext from '../../application-context';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ColorSubmitButton } from '../styles';

const theme = createTheme();

export default function SignUp() {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorDisplay, seterrorDisplay] = useState('');
    const [successDisplay, setSuccessDisplay] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        };

        let error = null;
        if (body.username === '') {
            setUsernameError(true);
            seterrorDisplay('Username is required');
            error = 'error';
        } else if (body.email === '') {
            setEmailError(true);
            seterrorDisplay('Email is required');
            error = 'error';
        } else if (body.password === '') {
            setPasswordError(true);
            seterrorDisplay('Password is required');
            error = 'error';
        }

        if (!error) {
            const signupUser = async () => {
                try {
                    const response = await axios.post(
                        `/api/users/create`,
                        body
                    );
                    setSuccessDisplay('Account successfully created');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                } catch (err: any) {
                    seterrorDisplay(
                        'User exists, please pick a unique username and/or email'
                    );
                }
            };
            signupUser();
        }
    };

    if (currentUser) {
        return <Navigate to='/profile' replace />;
    }

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
                        Create an account
                    </Typography>
                    <div className='text-sm leading-normal text-red-700 mt-3'>
                        {errorDisplay}
                    </div>
                    <div className='text-sm leading-normal text-green-700 mt-3'>
                        {successDisplay}
                    </div>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={usernameError}
                                    id='username'
                                    label='Username'
                                    name='username'
                                    autoComplete='username'
                                    onChange={() => {
                                        seterrorDisplay('');
                                        setUsernameError(false);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={emailError}
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    onChange={() => {
                                        seterrorDisplay('');
                                        setEmailError(false);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={passwordError}
                                    helperText='Password needs to include 4 or more characters'
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    onChange={() => {
                                        seterrorDisplay('');
                                        setPasswordError(false);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <ColorSubmitButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </ColorSubmitButton>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/login' variant='body2'>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
