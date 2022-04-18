import { Rating } from '@mui/material';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import ApplicationContext from '../../application-context';
import PostRatings from '../profile/PostRatings';

export const UserProfileSearchResult = (props: any) => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [userLinks, setUserLinks] = useState<any>([]);
    const [actionMessage, setActionMessage] = useState<any>('');
    const [value, setValue] = useState<number | null>(0);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(
                `api/posts/user/${props.searchResult.id}`
            );
            setUserLinks(res.data);
        };
        getData();
    }, [props.searchResult.id]);

    const handleAdd = (e: any) => {
        const body = {
            link: e.target.value,
        };

        const addPost = async () => {
            try {
                const res = await axios.post(`/api/posts/create`, body);
                console.log(res.statusText, 'status');
                setActionMessage('Successfully added to your profile');
            } catch (err) {
                console.error(err, 'error adding');
                setActionMessage(
                    'Error adding to your profile, please try again'
                );
            }
        };
        addPost();
    };

    return (
        <div>
            <main className='profile-page'>
                <section className='relative block' style={{ height: '500px' }}>
                    <div
                        className='absolute top-0 w-full h-full bg-center bg-cover'
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                        }}></div>
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
                                    <h3 className='text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2 uppercase'>
                                        @{props.searchResult.username}
                                    </h3>
                                    <div className='text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase'>
                                        <i className='fas fa-map-marker-alt mr-2 text-xs text-gray-500'></i>{' '}
                                        {userLinks.length} Posts
                                    </div>
                                </div>
                                <div className='mt-10 py-10 border-t border-gray-300 text-center'>
                                    <div className='text-xs leading-normal mt-0 mb-2 py-3 text-green-700 font-bold'>
                                        {actionMessage}
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
                                                                value={
                                                                    link.link
                                                                }
                                                                onClick={
                                                                    handleAdd
                                                                }
                                                                type='button'
                                                                className='py-1 px-3  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-fit transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'>
                                                                ADD
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
