import {
    Stack,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Box,
    FormControl,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import '../../App.css';
import { ColorSubmitButton } from '../styles';

export const NewPost = () => {
    const [link, setLink] = useState('');
    const [validLink, setValidLink] = useState('');
    const [platform, setPlatform] = useState('');
    const [newplatform, setNewPlatform] = useState('');
    const [invalidLinkText, setInvalidLinkText] = useState('');
    const [emptyFormError, setEmptyFormError] = useState(false);
    const [linkFormError, setLinkFormError] = useState(false);

    const handleSubmit = async () => {
        setNewPlatform(platform);
        setLink('');
        setPlatform('');
        setInvalidLinkText('');
        setEmptyFormError(false);

        const youtubeRegex = new RegExp(
            /^<iframe\swidth="560" height="315"\ssrc="https:\/\/www\.youtube\.com\/embed\/[^"\/<>]+"\stitle="[^"\/<>]+"\sframeborder="[^"\/<>]+"\sallow="[^"\/<>]+"\sallowfullscreen><\/iframe>$/gm
        );
        const instaRegex = new RegExp(
            /^https:\/\/www\.instagram\.com\/p\/[^"\/<>]+$/gm
        );
        const twitterRegex = new RegExp(
            /^<blockquote\sclass="twitter-tweet"><p lang="[^"\/<>]+" dir="ltr">[^"\/<>]+<\/p>[^"\/<>]+<a\shref="https:\/\/twitter\.com\/[^"\/<>]+\/status\/[^"\/<>]+">[^"\/<>]+<\/a><\/blockquote>\s<script async src="https:\/\/platform\.twitter\.com\/widgets\.js" charset="utf-8"><\/script>$/gm
        );
        const giphyRegex = new RegExp(
            /^<iframe\ssrc="https:\/\/giphy\.com\/embed\/.*<\/iframe><p><a href="https:\/\/giphy\.com\/[^"\/<>]+\/[^"\/<>]+">via GIPHY<\/a><\/p>$/gm
        );

        const postBody = {
            link,
        };

        const sendLink = async () => {
            try {
                const resPost = await axios.post(`/api/posts/create`, postBody);
                console.log(resPost.statusText);
            } catch (err) {
                console.error(err);
            }
        };

        if (link == '' || link == ' ') {
            setLinkFormError(true);
        }

        switch (platform) {
            case 'youtube':
                if (youtubeRegex.test(link)) {
                    postBody.link = link;
                    setValidLink(postBody.link);
                    sendLink();
                } else {
                    setInvalidLinkText(
                        "Invalid YouTube embed code, please use YouTube's embed code as is"
                    );
                }
                break;
            case 'instagram':
                if (instaRegex.test(link)) {
                    postBody.link = `<iframe src="${link}/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
                    sendLink();
                    setValidLink(postBody.link);
                } else {
                    setInvalidLinkText(
                        "Invalid Instagram post link, please use the insta's post link as is without a '/' at the end"
                    );
                }
                break;
            case 'twitter':
                if (twitterRegex.test(link)) {
                    postBody.link = link;
                    sendLink();
                    setValidLink(postBody.link);
                } else {
                    setInvalidLinkText(
                        "Invalid Twitter embed code, please use Twitter's embed code as is"
                    );
                }
                break;
            case 'giphy':
                if (giphyRegex.test(link)) {
                    postBody.link = link.split('<p>')[0];
                    sendLink();
                    setValidLink(postBody.link);
                } else {
                    setInvalidLinkText(
                        "Invalid Giphy embed code, please use Giphy's embed iframe code as is"
                    );
                }
                break;
            default:
                setEmptyFormError(true);
                setInvalidLinkText('Platform required');
        }
    };

    return (
        <div>
            <Stack
                direction='column'
                justifyContent='space-around'
                alignItems='center'
                spacing={1.5}>
                <h2>Embed a new post:</h2>
                <Box sx={{ m: 1, minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-autowidth-label'>
                            Platform Origin
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-autowidth-label'
                            id='demo-simple-select-autowidth'
                            label='Platform Origin'
                            value={platform}
                            error={emptyFormError}
                            onChange={(event: any) => {
                                setPlatform(event.target.value);
                                setLinkFormError(false);
                                if (event.target.value == 'instagram') {
                                    setInvalidLinkText(
                                        'No embed link needed, just an instagram post link'
                                    );
                                    setEmptyFormError(false);
                                } else {
                                    setInvalidLinkText(
                                        'Choose embed links from official sites'
                                    );
                                    setEmptyFormError(false);
                                }
                            }}>
                            <MenuItem value={'youtube'}>YouTube</MenuItem>
                            <MenuItem value={'instagram'}>Instagram</MenuItem>
                            <MenuItem value={'twitter'}>Twitter</MenuItem>
                            <MenuItem value={'giphy'}>Giphy</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    id='outlined-multiline-static'
                    label='Embed Link'
                    value={link}
                    rows={4}
                    error={linkFormError}
                    multiline
                    helperText={invalidLinkText}
                    onChange={(event: any) => {
                        setLinkFormError(false);
                        setLink(event.target.value);
                    }}
                />
                <ColorSubmitButton variant='contained' onClick={handleSubmit}>
                    Submit
                </ColorSubmitButton>
                <h3>Preview:</h3>
                <section dangerouslySetInnerHTML={{ __html: validLink }} />
            </Stack>
        </div>
    );
};
