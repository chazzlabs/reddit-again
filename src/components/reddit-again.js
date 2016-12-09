import React from 'react';

import SubredditChooser from './subreddit-chooser';
import ThreadList from './thread-list';

import { requestService } from '../services/request-service';

export default class RedditAgain extends React.Component {

    constructor() {
        super();

        this.state = {
            listings: [],
            links: []
        };
    }

    _onSelect(selectedId) {
        requestService.getLinks(this.state.listings.find(listing => listing.data.id === selectedId ).data.display_name)
            .then((response) => {
                this.setState({ links: response.data.children });
            });
    }

    componentDidMount() {
        requestService.getSubreddits()
            .then((response) => {
                this.setState({ listings: response.data.children });
            });
    }

    render() {
        return(
            <div>
                <SubredditChooser listings={this.state.listings} onSelect={this._onSelect.bind(this)}/>
                <ThreadList links={this.state.links} />
            </div>
        );
    }

}
