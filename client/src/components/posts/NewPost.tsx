import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Box,
    FormControl,
} from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ApplicationContext from '../../application-context';
import '../../App.css';

export const NewPost = () => {
    const [currentUser, setCurrentUser] = useContext(ApplicationContext);
    const [link, setLink] = useState('');
    const [validLink, setValidLink] = useState('');
    const [platform, setPlatform] = useState('');
    const [newplatform, setNewPlatform] = useState('');
    const [invalidLinkText, setInvalidLinkText] = useState('');
    const [emptyFormError, setEmptyFormError] = useState(false);
    const [linkFormError, setLinkFormError] = useState(false);
    const [previewText, setPreviewText] = useState(false);

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
                setPreviewText(true);
            } catch (err) {
                setLinkFormError(true);
                setInvalidLinkText('Error Creating post, please try again');
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
                    setLinkFormError(true);
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
                    setLinkFormError(true);
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
                    setLinkFormError(true);
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
                    setLinkFormError(true);
                }
                break;
            default:
                setEmptyFormError(true);
                setInvalidLinkText('Platform required');
        }
    };

    if (!currentUser) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div>
            <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden'>
                <div className='px-4 py-8 sm:px-10'>
                    <div className='relative mt-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm leading-5'>
                            <span className='px-2 text-gray-500 bg-white'>
                                Embed a new post
                            </span>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className='w-full space-y-6'>
                            <div className='w-full'>
                                <div className=' relative '>
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
                                                    setPlatform(
                                                        event.target.value
                                                    );
                                                    setLinkFormError(false);
                                                    if (
                                                        event.target.value ==
                                                        'instagram'
                                                    ) {
                                                        setInvalidLinkText(
                                                            'No embed link needed, just an instagram post link'
                                                        );
                                                        setEmptyFormError(
                                                            false
                                                        );
                                                    } else {
                                                        setInvalidLinkText(
                                                            'Choose embed links from official sites'
                                                        );
                                                        setEmptyFormError(
                                                            false
                                                        );
                                                    }
                                                }}>
                                                <MenuItem value={'youtube'}>
                                                    YouTube
                                                </MenuItem>
                                                <MenuItem value={'instagram'}>
                                                    Instagram
                                                </MenuItem>
                                                <MenuItem value={'twitter'}>
                                                    Twitter
                                                </MenuItem>
                                                <MenuItem value={'giphy'}>
                                                    GIPHY
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='relative '>
                                    <Box sx={{ m: 1, minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id='outlined-multiline-static'
                                                label='Embed Link'
                                                value={link}
                                                error={linkFormError}
                                                helperText={invalidLinkText}
                                                onChange={(event: any) => {
                                                    setLinkFormError(false);
                                                    setLink(event.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                            <div>
                                <span className='block w-full rounded-md shadow-sm'>
                                    <button
                                        onClick={handleSubmit}
                                        type='button'
                                        className='py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                                        Submit
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10'>
                    <p className='text-xs leading-5 text-gray-500'>Preview:</p>
                    {previewText && !linkFormError && (
                        <div className='text-sm leading-normal mt-0 mb-2 py-3 text-green-800 font-bold'>
                            <Link to='/profile'>
                                Success! Click to view on Profile
                            </Link>
                        </div>
                    )}
                    {!linkFormError && (
                        <div
                            className='flex justify-center items-center h-screen"'
                            dangerouslySetInnerHTML={{ __html: validLink }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
