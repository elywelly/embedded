import axios from 'axios';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import ApplicationContext from '../../application-context';

export const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [userLinks, setUserLinks] = useState<any>([]);
    const [buttonId, setButtonId] = useState<any>(0);

    // TODO
    // rating attached to each card (post), create rating on change
    // update rating on change

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`api/posts/profile`);
            setUserLinks(res.data);
        };
        getData();
    }, [buttonId]);

    const handleDelete = (e: any) => {
        setButtonId(e.target.value);
        const body = {
            id: e.target.value,
        };

        const deletePost = async () => {
            try {
                const res = await axios.delete(`/api/posts/delete`, {
                    data: { body },
                });
                console.log(res.statusText);
            } catch (err) {
                console.error(err);
            }
        };
        deletePost();
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
                                    <h3 className='text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2'>
                                        @{currentUser.username}
                                    </h3>
                                    <div className='text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase'>
                                        <i className='fas fa-map-marker-alt mr-2 text-lg text-gray-500'></i>{' '}
                                        Number of posts here
                                    </div>
                                </div>
                                <div className='mt-10 py-10 border-t border-gray-300 text-center'>
                                    <div className='flex flex-wrap justify-center gap-20'>
                                        {userLinks.map(
                                            (link: {
                                                user_id: number;
                                                id: number;
                                                link: string;
                                            }) => {
                                                return (
                                                    <div className='flex flex-col justify-center gap-5'>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.link,
                                                            }}
                                                        />
                                                        <button
                                                            value={link.id}
                                                            onClick={
                                                                handleDelete
                                                            }
                                                            type='button'
                                                            className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-fit transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'>
                                                            -
                                                        </button>
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
