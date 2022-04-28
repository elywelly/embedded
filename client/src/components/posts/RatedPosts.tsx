import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ApplicationContext from '../../application-context';
import PostRatings from '../profile/PostRatings';

const background: string = './background.png';

export const RatedPosts = () => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [ratedPosts, setRatedPosts] = useState<any>([]);
    const [errorActionMessage, setErrorActionMessage] = useState<any>('');
    const [rating, setRating] = useState<any>('desc');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`api/post_ratings/rated/${rating}`);

                setRatedPosts(res.data);
            } catch {
                setErrorActionMessage(`Error getting rated posts`);
            }
        };
        getData();
    }, [rating]);

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
                                    <h3 className='text-4xl font-semibold leading-normal mb-2 text-gold-800 mb-2'>
                                        @{currentUser.username.toUpperCase()}'s
                                        RATED POSTS
                                    </h3>
                                    <div className='text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase'>
                                        <i className='fas fa-map-marker-alt mr-2 text-lg text-gray-500'></i>{' '}
                                        {ratedPosts.length} Posts Rated
                                    </div>
                                </div>
                                <div className='mt-10 py-10 border-t border-gray-300 text-center'>
                                    <FormControl
                                        sx={{ m: 1, minWidth: 120 }}
                                        size='small'>
                                        <InputLabel id='demo-select-small'>
                                            Rating
                                        </InputLabel>
                                        <Select
                                            labelId='demo-select-small'
                                            id='demo-select-small'
                                            value={rating}
                                            label='Rating'
                                            onChange={(event: any) =>
                                                setRating(event.target.value)
                                            }>
                                            <MenuItem value={'asc'}>
                                                Low - High
                                            </MenuItem>
                                            <MenuItem value={'desc'}>
                                                High - Low
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div className='text-sm leading-normal mt-0 mb-2 py-3 text-red-700 font-bold'>
                                        {errorActionMessage}
                                    </div>
                                    <div className='flex flex-wrap justify-center gap-10'>
                                        {ratedPosts.map(
                                            (link: {
                                                id: number;
                                                rating: number;
                                                link: string;
                                            }) => {
                                                return (
                                                    <div
                                                        className='flex flex-col justify-center gap-5'
                                                        key={link.id}>
                                                        <div
                                                            className='each-embed'
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.link,
                                                            }}
                                                        />
                                                        <div className='flex flex-wrap'>
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
