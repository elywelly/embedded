import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
const logo: string = './icon.png';

export default function NavBar() {
    return (
        <Disclosure as='nav' className='bg-white-800'>
            {({ open }) => (
                <>
                    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex items-center justify-between h-16'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
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
                                <div className='flex-shrink-0 flex items-center'>
                                    <img
                                        className='block h-8 w-auto'
                                        src={require(`${logo}`)}
                                        alt='Embedded'
                                    />
                                    <span className='flex items-center block text-indigo-700 xl:inline uppercase font-extrabold'>
                                        EMBEDDED
                                    </span>
                                </div>
                                <div className='hidden my-0 mx-auto sm:block '>
                                    <div className='flex space-x-12'>
                                        <Link
                                            to='/about'
                                            className='text-xl font-large text-gray-500 hover:text-indigo-700 hover:font-bold'>
                                            About
                                        </Link>
                                        <Link
                                            to='/login'
                                            className='text-xl font-large text-gray-500 hover:text-indigo-700 hover:font-bold'>
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                <Link
                                    to='/signup'
                                    className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <Disclosure.Button>
                                <Link
                                    to='/about'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:bg-indigo-700'>
                                    About
                                </Link>
                                <Link
                                    to='/signup'
                                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
                                    Sign up
                                </Link>
                                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                                    Existing customer?{' '}
                                    <Link
                                        to='/login'
                                        className='text-indigo-600 hover:text-indigo-500 hover:font-bold'>
                                        Login
                                    </Link>
                                </p>
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
