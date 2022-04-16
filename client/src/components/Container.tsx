import { useContext } from 'react';
import ApplicationContext from '../application-context';
import LoggedInNav from './NavBar/LoggedInNav';

import NavBar from './NavBar/NavBar';

export default function Container() {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);

    return <div>{currentUser ? <LoggedInNav /> : <NavBar />}</div>;
}
