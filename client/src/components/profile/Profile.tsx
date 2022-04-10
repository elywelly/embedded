import axios from 'axios';
import { useEffect, useState } from 'react';

export const Profile = () => {
    const [user, setUser] = useState<any>('');
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`api/users`);
            console.log(res.data.username);
            setUser(res.data.username);
        };
        getData();
    }, []);

    return <div>{user}</div>;
};
