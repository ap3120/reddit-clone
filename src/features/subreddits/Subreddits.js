import {useState} from 'react';
import {setSelectedSubreddit} from '../../app/redditSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import '../../App.css';

export const Subreddit = (props) => {
    const {subreddit} = props;
    const dispatch = useDispatch();
    const handleClick = () => {
        const url = subreddit.display_name_prefixed;
        dispatch(setSelectedSubreddit(url));
    }
    const imageStyle = {
        backgroundImage: 'url('+subreddit.header_img+')',
        width: '55px',
        height: '55px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '1px solid'+subreddit.key_color,
    }

    return (
        <div className='subreddit'>
            <div style={imageStyle}></div>
            <h5>{subreddit.display_name_prefixed}</h5>
            <button className='button-subreddit' onClick={handleClick}>Go!</button>
        </div>
    );
}
