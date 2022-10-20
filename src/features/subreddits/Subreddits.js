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
    }

    return (
        <div className='subreddit' style={{backgroundColor:subreddit.banner_background_color}}>
            <div style={imageStyle}></div>
            <h5>{subreddit.display_name_prefixed}</h5>
            <button className='button-subreddit' onClick={handleClick}>Go!</button>
        </div>
    );
}
