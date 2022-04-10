import { Button, ButtonProps, Stack, styled, TextField } from '@mui/material';
import { purple } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

export const NewPost = () => {
    const [link, setLink] = useState('');
    const [newlink, setNewLink] = useState('');
    // get value on submit, put in db
    // clear field
    // profile page to get from db all posts and display
    // if section innerHTML empty to say issue with link, if not render

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
                    defaultValue='Hello!'
                    onChange={(event: any) => {
                        setLink(event.target.value);
                    }}
                />
                <ColorButton
                    variant='contained'
                    onClick={() => {
                        setNewLink(link);
                    }}>
                    Submit
                </ColorButton>
                <h3>Preview:</h3>
                <section dangerouslySetInnerHTML={{ __html: newlink }} />
            </Stack>
        </div>
    );
};
