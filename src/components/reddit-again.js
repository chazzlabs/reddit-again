import React from 'react';
import Select from 'react-select';

import ThreadList from './thread-list';
import Thread from './thread';
import LoadingIndicator from './loading-indicator';

import { requestService } from '../services/request-service';

export default class RedditAgain extends React.Component {

    constructor() {
        super();

        this.BODY_STATES = { EMPTY: 0, LOADING: 1, THREAD_LIST: 2, THREAD: 3 };

        this.state = {
            selected: undefined,
            listings: [],
            links: [],
            thread: undefined,
            bodyState: this.BODY_STATES.EMPTY
        };
    }

    _onListingSelect(selected) {
        this.setState({ bodyState: this.BODY_STATES.LOADING, selected: selected });

        requestService.getLinks(this.state.listings.find(listing => listing.data.id === selected.value ).data.display_name)
            .then((response) => {
                this.setState({ links: response.data.children, bodyState: this.BODY_STATES.THREAD_LIST });
            });
    }

    _onLinkClick(link) {
        this.setState({ thread: link, bodyState: this.BODY_STATES.THREAD });
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
                bodyContent = <ThreadList links={ this.state.links } onLinkClick={ this._onLinkClick.bind(this) } />;
                break;
            case this.BODY_STATES.THREAD:
                bodyContent = <Thread link={ this.state.thread }/>;
                break;
            default:
                bodyContent = <div className="body-empty">Select a subreddit from the dropdown to view its current links.</div>;
                break;
        }

        const selectOptions = this.state.listings
            .map((listing) => {
                return { value: listing.data.id, label: listing.data.display_name };
            })
            .sort((a,b) => {
                if (a.label.toLowerCase() < b.label.toLowerCase())
                    return -1;
                if (a.label.toLowerCase() > b.label.toLowerCase())
                    return 1;
                return 0;
            });

        return(
            <div>
                <Select
                    value={ this.state.selected }
                    options={ selectOptions }
                    onChange={ this._onListingSelect.bind(this) }
                    searchable={ true }
                    clearable={ false } />
                {bodyContent}
            </div>
        );
    }

}
