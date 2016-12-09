import $ from 'jquery';

class RequestService {

    getSubreddits() {
        return $.ajax('https://www.reddit.com/reddits.json');
    }

    getLinks(subreddit) {
        return $.ajax(`https://www.reddit.com/r/${subreddit}.json`);
    }
}

export const requestService = new RequestService();
