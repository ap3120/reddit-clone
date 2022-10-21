import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Post} from '../posts/post.js';
import {Subreddit} from '../subreddits/Subreddits';
import {selectFilteredPosts, fetchPosts, selectSubreddits, fetchSubreddits} from '../../app/redditSlice.js';
import '../../App.css';

export const Home = () => {
    const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const subreddits = useSelector(selectSubreddits);
    
    useEffect(()=>{
        dispatch(fetchPosts(selectedSubreddit))
        dispatch(fetchSubreddits());
    }, [selectedSubreddit]);

    return (
        <div className='home'>
            <div className='posts-container'>
                {posts.map((post, index) => (<Post key={post.id} index={index} post={post} />))}
            </div>
            <div className='subreddits-container'>
                {subreddits.map((subreddit, index) => (<Subreddit key={subreddit.id} subreddit={subreddit} />))}
            </div>
        </div>
    )
}
