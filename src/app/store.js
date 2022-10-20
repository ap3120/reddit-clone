import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice.js';

export const store = configureStore({
    reducer: {
        reddit: redditReducer,
    },
});
