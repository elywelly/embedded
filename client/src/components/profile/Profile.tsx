import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ApplicationContext from '../../application-context';
import PostRatings from './PostRatings';
const background: string = './background.avif';

export const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [userLinks, setUserLinks] = useState<any>([]);
    const [errorActionMessage, setErrorActionMessage] = useState<any>('');
    const [successActionMessage, setSuccessActionMessage] = useState<any>('');
    const [order_by, setOrderBy] = useState<any>('desc');

    const getData = async () => {
        try {
            const res = await axios.get(`api/posts/profile/${order_by}`);
            setUserLinks(res.data);
        } catch (err) {
            setErrorActionMessage('Error getting data, please try again later');
        }
    };

    useEffect(() => {
        getData();
    }, [order_by]);

    const handleDelete = (post_id: number) => {
        const body = {
            id: post_id,
        };

        const deletePost = async () => {
            try {
                const res = await axios.delete(`/api/posts/delete`, {
                    data: { body },
                });
                setSuccessActionMessage('Successfully deleted from profile');
                getData();
            } catch (err) {
                setErrorActionMessage('Delete error, please try again');
            }
        };
        deletePost();
    };

    if (!currentUser) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div>
            <main className='profile-page'>
                <section className='relative block' style={{ height: '500px' }}>
                    <img
                        className='absolute top-0 w-full h-full bg-center bg-cover object-cover'
                        src={require(`${background}`)}
                        alt=''
                    />
                    <div
                        className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden'
                        style={{ height: '70px' }}>
                        <svg
                            className='absolute bottom-0 overflow-hidden'
                            xmlns='http://www.w3.org/2000/svg'
                            preserveAspectRatio='none'
                            version='1.1'
                            viewBox='0 0 2560 100'
                            x='0'
                            y='0'>
                            <polygon
                                className='text-gray-300 fill-current'
                                points='2560 0 2560 100 0 100'></polygon>
                        </svg>
                    </div>
                </section>
                <section className='relative py-16 bg-gray-300'>
                    <div className='container mx-auto px-4'>
                        <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                            <div className='px-6'>
                                <div className='text-center mt-12'>
                                    <h3 className='text-4xl font-semibold leading-normal mb-2 text-indigo-800 mb-2'>
                                        @{currentUser.username}
                                    </h3>
                                    <div className='text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase'>
                                        <i className='fas fa-map-marker-alt mr-2 text-lg text-gray-500'></i>{' '}
                                        {userLinks.length} Posts
                                    </div>
                                </div>
                                <div className='mt-10 py-10 border-t border-gray-300 text-center'>
                                    <FormControl
                                        sx={{ m: 1, minWidth: 150 }}
                                        size='small'>
                                        <InputLabel id='demo-select-small'>
                                            Order By
                                        </InputLabel>
                                        <Select
                                            labelId='demo-select-small'
                                            id='demo-select-small'
                                            value={order_by}
                                            label='Rating'
                                            onChange={(event: any) =>
                                                setOrderBy(event.target.value)
                                            }>
                                            <MenuItem value={'asc'}>
                                                Oldest - Newest
                                            </MenuItem>
                                            <MenuItem value={'desc'}>
                                                Newest - Oldest
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className='text-sm leading-normal mt-0 mb-2 py-3 text-red-700 font-bold'>
                                        {errorActionMessage}
                                    </div>
                                    <div className='text-sm leading-normal mt-0 mb-2 py-3 text-green-700 font-bold'>
                                        {successActionMessage}
                                    </div>
                                    <div className='flex flex-wrap justify-center gap-10'>
                                        {userLinks.map(
                                            (link: {
                                                user_id: number;
                                                id: number;
                                                link: string;
                                            }) => {
                                                return (
                                                    <div
                                                        className='flex flex-col justify-center gap-5'
                                                        key={link.id}>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.link,
                                                            }}
                                                        />
                                                        <div className='flex flex-wrap'>
                                                            <button
                                                                value={link.id}
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        link.id
                                                                    )
                                                                }
                                                                type='button'
                                                                className='flex-start py-1 px-3  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-fit transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'>
                                                                DELETE
                                                            </button>
                                                            <PostRatings
                                                                link={link}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
