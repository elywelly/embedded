import axios from 'axios';
import { useEffect, useState } from 'react';

export const Profile = () => {
    const [userLinks, setUserLinks] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            // TODO change to userid = session.id
            const res = await axios.get(`api/posts/1`);
            console.log(res.data);
            setUserLinks(res.data);
        };
        getData();
    }, []);

    return (
        <div>
            {userLinks.map((link: any) => {
                return (
                    <section dangerouslySetInnerHTML={{ __html: link.link }} />
                );
            })}
        </div>
    );
};
