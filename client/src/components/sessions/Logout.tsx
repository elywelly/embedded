import axios from 'axios';
import { Link } from 'react-router-dom';

export function Logout() {
    axios.delete('/api/sessions').then((res) => {});

    return <Link to='/' />;
}
