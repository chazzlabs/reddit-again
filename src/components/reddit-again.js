import React from 'react';
import $ from 'jquery';

import SubredditChooser from './subreddit-chooser';

export default class RedditAgain extends React.Component {

    constructor() {
        super();

        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: 'https://www.reddit.com/reddits.json',
            success: (response) => {
                this.setState({ listings: response.data.children });
            }
        });
    }

    _onSelect(selectedId) {
        if (selectedId !== 'default') {
            console.log(this.state.listings.find(listing => listing.data.id === selectedId ));
        }
    }

    render() {
        return(
            <div>
                <SubredditChooser listings={this.state.listings} onSelect={this._onSelect.bind(this)}/>
            </div>
        );
    }

}
