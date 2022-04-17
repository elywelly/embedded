import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import ApplicationContext from '../../application-context';

export const UserProfileSearchResult = (props: any) => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [searchedUsed, setSearchedUser] = useState(props);
    const [userLinks, setUserLinks] = useState<any>([]);

    useEffect(() => {
        setSearchedUser(props);
        const getData = async () => {
            const res = await axios.get(
                `api/posts/user/${props.searchResult.id}`
            );
            console.log(res.data);
            setUserLinks(res.data);
        };
        getData();
    }, [props]);

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
                                        @{props.searchResult.username}
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
                                                post_id: number;
                                                link: string;
                                            }) => {
                                                return (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.link,
                                                        }}
                                                    />
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
