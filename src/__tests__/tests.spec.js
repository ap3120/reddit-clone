const setSearchTerm = require('../app/redditSlice');

describe('Search term function', ()=>{
    test('It should set the search term (action.payload)', ()=>{
        let state = {
            isLoading: false,
            selectedSubreddit: 'r/funny',
            searchTerm: '',
            error: false,
            posts: [],
            subreddits: [],
        }
        const input = {type:'reddit/setSearchTerm', payload:'world'};
        const output = {
            isLoading: false,
            selectedSubreddit: 'r/funny',
            searchTerm: 'world',
            error: false,
            posts: [],
            subreddits: [],
        }
        
        setSearchTerm(state, input);

        expect(state).toEqual(output);
    });
});
