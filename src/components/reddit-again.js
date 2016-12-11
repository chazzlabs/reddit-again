import React from 'react';

import SubredditChooser from './subreddit-chooser';
import ThreadList from './thread-list';
import LoadingIndicator from './loading-indicator';

import { requestService } from '../services/request-service';

export default class RedditAgain extends React.Component {

    constructor() {
        super();

        this.BODY_STATES = { EMPTY: 0, LOADING: 1, THREAD_LIST: 2, THREAD: 3 };

        this.state = {
            listings: [],
            links: [],
            bodyState: this.BODY_STATES.EMPTY
        };
    }

    _onSelect(selectedId) {
        this.setState({ bodyState: this.BODY_STATES.LOADING });

        requestService.getLinks(this.state.listings.find(listing => listing.data.id === selectedId ).data.display_name)
            .then((response) => {
                this.setState({ links: response.data.children, bodyState: this.BODY_STATES.THREAD_LIST });
            });
    }

    componentDidMount() {
        this.setState({ bodyState: this.BODY_STATES.LOADING });

        requestService.getSubreddits()
            .then((response) => {
                this.setState({ listings: response.data.children, bodyState: this.BODY_STATES.EMPTY });
            });
    }

    render() {
        let bodyContent;

        switch (this.state.bodyState) {
            case this.BODY_STATES.LOADING:
                bodyContent = <LoadingIndicator />;
                break;
            case this.BODY_STATES.THREAD_LIST:
                bodyContent = <ThreadList links={this.state.links} />;
                break;
            case this.BODY_STATES.THREAD:
                // bodyContent = <Thread />;
                break;
            default:
                bodyContent = <div>Select a subreddit from the dropdown to view its current links.</div>;
                break;
        }

        return(
            <div>
                <SubredditChooser listings={this.state.listings} onSelect={this._onSelect.bind(this)}/>
                {bodyContent}
            </div>
        );
    }

}
