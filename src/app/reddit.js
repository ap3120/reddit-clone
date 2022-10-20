export const urlRoot = 'https://www.reddit.com';

export const getSubredditPosts = async(subreddit) => {
    const response = await fetch(`${urlRoot}/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map(child => child.data);
}

export const getSubreddits = async() => {
    const response = await fetch(`${urlRoot}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map(child => child.data);
}

export const getPostComments = async(subreddit) => {
    const response = await fetch(`${urlRoot}${subreddit}comments.json`);
    const json = await response.json();
    return json[1].data.children.map(child => child.data);
}
