import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
const logo: string = './icon.png';

export default function LoggedInNavBar() {
    const { pathname } = useLocation();

    return (
        <Disclosure as='nav' className='bg-white-800'>
            {({ open }) => (
                <>
                    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex items-center justify-between h-16'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <MenuIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                                <div
                                    className='flex-shrink-0 flex items-center'
                                    >
                                    <Link to='/'>
                                        <img
                                            className='h-8 w-auto sm:h-10'
                                            src={require(`${logo}`)}
                                            alt=''
                                        />
                                    </Link>
                                    <div className='flex items-center block text-indigo-700 xl:inline uppercase font-extrabold'>
                                        EMBEDDED
                                    </div>
                                </div>
                                <div className='hidden my-0 mx-auto sm:block self-center'>
                                    <div className='flex space-x-12'>
                                        <Link
                                            to='/embed'
                                            className='text-base font-medium text-gray-700 hover:text-indigo-700 hover:font-bold'>
                                            {pathname == '/embed' ? (
                                                <span className='font-bold text-indigo-700'>
                                                    {' '}
                                                    Embed
                                                </span>
                                            ) : (
                                                'Embed'
                                            )}
                                        </Link>
                                        <Link
                                            to='/search'
                                            className='text-base font-medium text-gray-700 hover:text-indigo-700 hover:font-bold'>
                                            {pathname == '/search' ? (
                                                <span className='font-bold text-indigo-700'>
                                                    {' '}
                                                    Search User
                                                </span>
                                            ) : (
                                                'Search User'
                                            )}
                                        </Link>
                                        <Link
                                            to='/profile'
                                            className='text-base font-medium text-gray-700 hover:text-indigo-700 hover:font-bold'>
                                            {pathname == '/profile' ? (
                                                <span className='font-bold text-indigo-700'>
                                                    {' '}
                                                    Profile
                                                </span>
                                            ) : (
                                                'Profile'
                                            )}
                                        </Link>
                                        <Link
                                            to='/rated'
                                            className='text-base font-medium text-gray-700 hover:text-indigo-700 hover:font-bold'>
                                            {pathname == '/rated' ? (
                                                <span className='font-bold text-indigo-700'>
                                                    {' '}
                                                    Rated
                                                </span>
                                            ) : (
                                                'Rated'
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                <Link
                                    to='/logout'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <Disclosure.Button>
                                <Link
                                    to='/embed'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:text-indigo-700 hover:font-bold'>
                                    Embed
                                </Link>
                                <Link
                                    to='/search'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:text-indigo-700 hover:font-bold'>
                                    Search User
                                </Link>
                                <Link
                                    to='/profile'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:text-indigo-700 hover:font-bold'>
                                    Profile
                                </Link>
                                <Link
                                    to='/rated'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:text-indigo-700 hover:font-bold'>
                                    Rated
                                </Link>
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
