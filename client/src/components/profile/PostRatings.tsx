import { Rating } from '@mui/material';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';

export default function PostRatings(props: any) {
    const [value, setValue] = useState<number | null>(null);

    useEffect(() => {
        const body = {
            post_id: props.link.id,
        };

        const getData = async () => {
            console.log(body);
            const res = await axios.get(`api/post_ratings/post`, {
                data: { body },
            });
            console.log(res.data);
            if (res.data !== null) {
                setValue(res.data);
            }
        };
        getData();
    }, []);

    const handleRating = (
        event: any,
        newValue: SetStateAction<number | null>
    ) => {
        console.log(value, 'value');
        console.log(newValue, 'newValue');
        const createBody = {
            post_id: props.link.id,
            rating: newValue,
        };

        const createRating = async () => {
            try {
                const res = await axios.post(
                    `/api/post_ratings/create`,
                    createBody
                );
                console.log(res.statusText);
            } catch (err) {
                console.error(err);
            }
        };

        const updateBody = {
            rating: newValue,
            post_id: props.link.id,
        };

        const updateRating = async () => {
            try {
                const res = await axios.patch(
                    `/api/post_ratings/update`,
                    updateBody
                );
                console.log(res.statusText);
            } catch (err) {
                console.error(err);
            }
        };

        if (value !== null) {
            setValue(newValue);
            updateRating();
        } else {
            setValue(newValue);
            createRating();
        }
    };

    return (
        <>
            <Rating
                className='ml-auto'
                name='simple-controlled'
                value={value}
                onChange={handleRating}
            />
        </>
    );
}
