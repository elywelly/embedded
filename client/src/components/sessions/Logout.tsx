import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationContext from '../../application-context';

export function Logout() {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);

    const navigate = useNavigate();

    axios
        .delete('/api/sessions')
        .then((res) => {
            setCurrentUser(null);
            navigate('/login');
        })
        .catch((err) => {
            alert('Error logging out');
        });

    return <Link to='/' />;
}
