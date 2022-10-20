import {createSlice, createSelector} from '@reduxjs/toolkit';
import {getSubredditPosts, getPostComments, getSubreddits} from './reddit.js';

export const redditSlice = createSlice({
    name:'reddits',
    initialState: {
        isLoading: false,
        selectedSubreddit: 'r/funny',
        searchTerm: '',
        error: false,
        posts: [],
        subreddits: [],
    },
    reducers: {
        setSearchTerm (state, action){
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit (state, action){
            state.selectedSubreddit = action.payload;
        },
        getSuccessfulPosts (state, action){
            state.isLoading = false;
            state.posts = action.payload;
            state.error = false;
        },
        getUnsuccessfulPosts (state, action) {
            state.isLoading = false;
            state.error = true;
        },
        getCommentsOngoing (state, action){
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].errorComments = false;
        },
        getSuccessfulComments (state, action){
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].errorComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getUnsuccessfulComments (state, action) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].errorComments = true;
        },
        getSuccessfulSubreddits (state, action) {
            state.subreddits = action.payload;
        },
    }
})

export const selectPosts = (state) => state.reddit.posts;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSubreddits = (state) => state.reddit.subreddits;
export const {
    setSearchTerm,
    setSelectedSubreddit,
    getSuccessfulPosts,
    getUnsuccessfulPosts,
    getSuccessfulComments,
    getUnsuccessfulComments,
    getCommentsOngoing,
    getSuccessfulSubreddits,
} = redditSlice.actions;

export default redditSlice.reducer;

export const fetchPosts = (subreddit) => async(dispatch) => {
    try{
        const posts = await getSubredditPosts(subreddit);
        dispatch(getSuccessfulPosts(posts.map(post => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }))));
    } catch(error){
        console.log(error);
        getUnsuccessfulPosts();
    }
}

export const fetchSubreddits = () => async(dispatch) => {
    try {
        const subreddits = await getSubreddits();
        dispatch(getSuccessfulSubreddits(subreddits));
    } catch(error){
        console.log(error);
    }
}

export const fetchComments = (index, post) => async(dispatch) => {
    try {
        dispatch(getCommentsOngoing(index));
        const comments = await getPostComments(post);
        dispatch(getSuccessfulComments({index, comments}));
    } catch(error) {
        console.log(error);
        getUnsuccessfulComments(index);
    }
}

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm){
            return posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return posts;
        }
    }
);
