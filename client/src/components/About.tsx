import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ApplicationContext from '../application-context';
const homeImage: string = './homeimage.png';

export default function About(props: any) {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);

    if (!currentUser) {
        return (
            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
                <div className='relative bg-white overflow-hidden'>
                    <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-xl lg:w-full lg:pb-28 xl:pb-32 h-full'>
                        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
                            <div className='sm:text-center lg:text-left'>
                                <h1 className='text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                                    <span className='block xl:inline'>
                                        All your greatest hits
                                    </span>{' '}
                                    <span className='block text-indigo-600 xl:inline'>
                                        Embedded
                                    </span>
                                </h1>
                                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                                    So many memes, so many platforms and so
                                    little time. Can't remember if you saw it on
                                    GIPHY or YouTube? Embedded is a platform to
                                    consolidate your favourite posts from
                                    various social media platforms. Just embed
                                    them onto your embedded profile. The best
                                    way to share all your top hits with others
                                    or revisit them.
                                </p>
                                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                                    <div className='rounded-md shadow'>
                                        <Link
                                            to='/signup'
                                            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                                            Join us
                                        </Link>
                                    </div>
                                    <div className='mt-3 sm:mt-0 sm:ml-3'>
                                        <Link
                                            to='/login'
                                            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'>
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
                        <img
                            className='max-w-full max-h-full'
                            src={require(`${homeImage}`)}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <Navigate to='/profile' replace />;
}
