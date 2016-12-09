import React from 'react';
import $ from 'jquery';

import SubredditChooser from './subreddit-chooser';
import ThreadLink from './thread-link';

export default class RedditAgain extends React.Component {

    constructor() {
        super();

        this.state = {
            listings: [],
            links: []
        };
    }

    _getSubreddits() {
        $.ajax({
            url: 'https://www.reddit.com/reddits.json',
            success: (response) => {
                this.setState({ listings: response.data.children });
            }
        });
    }

    _getLinks(subreddit) {
        $.ajax({
            url: `https://www.reddit.com/r/${subreddit}.json`,
            success: (response) => {
                this.setState({ links: response.data.children });
            }
        });
    }

    _onSelect(selectedId) {
        this._getLinks(this.state.listings.find(listing => listing.data.id === selectedId ).data.display_name);
    }

    componentDidMount() {
        this._getSubreddits();
    }

    render() {
        return(
            <div>
                <SubredditChooser listings={this.state.listings} onSelect={this._onSelect.bind(this)}/>

                <div>
                    {this.state.links.map(link => <ThreadLink key={link.data.id} link={link} />)}
                </div>
            </div>
        );
    }

}
