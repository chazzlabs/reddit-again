import React from 'react';
import Select from 'react-select';

import ThreadList from './thread-list';
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
            bodyState: this.BODY_STATES.EMPTY
        };
    }

    _onSelect(selected) {
        this.setState({ bodyState: this.BODY_STATES.LOADING, selected: selected });

        requestService.getLinks(this.state.listings.find(listing => listing.data.id === selected.value ).data.display_name)
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

        const selectOptions = this.state.listings.map((listing) => {
            return { value: listing.data.id, label: listing.data.display_name };
        });

        return(
            <div>
                <Select
                    value={ this.state.selected }
                    options={ selectOptions }
                    onChange={ this._onSelect.bind(this) }
                    searchable={ true }
                    clearable={ false } />
                {bodyContent}
            </div>
        );
    }

}
