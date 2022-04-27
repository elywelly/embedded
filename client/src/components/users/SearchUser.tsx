import { TextField, Box, FormControl } from '@mui/material';
import axios from 'axios';
import { useState, useContext } from 'react';
import ApplicationContext from '../../application-context';
import '../../App.css';
import { UserProfileSearchResult } from './UserProfileSearchResult';
import { Navigate } from 'react-router-dom';

export const SearchUser = () => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [username, setUsername] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [invalidUserText, setinvalidUserText] = useState('');
    const [userFormError, setUserFormError] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    const handleSubmit = () => {
        setEnteredUsername(username.toLowerCase());

        let error = null;
        if (username == '' || username == ' ') {
            setinvalidUserText('Username cannot be empty');
            error = 'error';
        }

        if (!error) {
            const getData = async () => {
                try {
                    const res = await axios.get(
                        `/api/users/profile/${username.toLowerCase()}`
                    );
                    if (res.data === null) {
                        setinvalidUserText('User does not exist');
                        setUsername('');
                    } else {
                        setSearchResult(res.data);
                    }
                } catch {
                    setinvalidUserText('Error finding user, please try again');
                }
            };
            getData();
        }
    };

    if (!currentUser) {
        return <Navigate to='/login' replace />;
    }

    return (
        <>
            <div>
                <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden'>
                    <div className='px-4 py-8 sm:px-10'>
                        <div className='relative mt-6'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center text-sm leading-5'>
                                <span className='px-2 text-gray-500 bg-white'>
                                    SearchUser
                                </span>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <div className='w-full space-y-6'>
                                <div className='w-full'>
                                    <div className='relative '>
                                        <Box sx={{ m: 1, minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id='outlined-multiline-static'
                                                    label='Username'
                                                    value={username}
                                                    error={
                                                        invalidUserText.length >
                                                        0
                                                    }
                                                    helperText={invalidUserText}
                                                    onChange={(event: any) => {
                                                        setinvalidUserText('');
                                                        setUserFormError(false);
                                                        setUsername(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div>
                                    <span className='block w-full rounded-md shadow-sm'>
                                        <button
                                            onClick={handleSubmit}
                                            type='button'
                                            className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                                            Search
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10'>
                        <p className='text-xs leading-5 text-gray-500'>
                            User not found? Get them to join to Embedded!
                        </p>
                    </div>
                </div>
            </div>
            {searchResult !== null && (
                <UserProfileSearchResult searchResult={searchResult} />
            )}
        </>
    );
};
