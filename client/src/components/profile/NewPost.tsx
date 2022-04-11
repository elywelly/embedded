import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { ReactChild, ReactNode, useEffect, useRef, useState } from 'react';
import { ColorSubmitButton } from './styles';

export const NewPost = () => {
    const [link, setLink] = useState('');
    const [newlink, setNewLink] = useState('');

    // conditional to add to db or not based on iframe code
    // if section innerHTML empty to say issue with link, if not render

    // const [preview, setPreview] = useState('');
    // const previewRef = useRef<HTMLElement>(null);
    // useEffect(() => setPreview(previewRef?.current?.children[0]), []);

    const handleSubmit = async () => {
        setNewLink(link);
        setLink('');

        const postBody = {
            user_id: 1,
            link: link,
        };

        const sendLink = async () => {
            try {
                const resPost = await axios.post(`/api/posts/create`, postBody);
                console.log(resPost.statusText);
                createRating();
            } catch (err) {
                console.error(err);
            }
        };
        sendLink();

        // get post id - is there a better way to auto create rating?

        const ratingBody = {
            user_id: 1,
            post_id: link,
            rating: 0,
        };

        const createRating = async () => {
            try {
                const resPost = await axios.post(
                    `/api/post_ratings/create`,
                    ratingBody
                );
                console.log(resPost.statusText);
                createRating();
            } catch (err) {
                console.error(err);
            }
        };
    };

    return (
        <div>
            <Stack
                direction='column'
                justifyContent='space-around'
                alignItems='center'
                spacing={1.5}>
                <h2>Embed a new post:</h2>
                <TextField
                    id='outlined-multiline-static'
                    label='Embed Link'
                    value={link}
                    rows={4}
                    multiline
                    onChange={(event: any) => {
                        setLink(event.target.value);
                    }}
                />
                <ColorSubmitButton variant='contained' onClick={handleSubmit}>
                    Submit
                </ColorSubmitButton>
                <h3>Preview:</h3>
                <section dangerouslySetInnerHTML={{ __html: newlink }} />
            </Stack>
        </div>
    );
};
