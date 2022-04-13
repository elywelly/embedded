import axios from 'axios';
import { useEffect, useState } from 'react';

export const Profile = () => {
    const [userLinks, setUserLinks] = useState<any>([]);

    // TODO
    // rating attached to each card (post), create rating on change
    // update rating on change

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
            {userLinks.map(
                (link: { user_id: number; post_id: number; link: string }) => {
                    return (
                        <div dangerouslySetInnerHTML={{ __html: link.link }} />
                    );
                }
            )}
        </div>
    );
};
