import React from 'react';

import LoadingIndicator from './loading-indicator';

import { requestService } from '../services/request-service';
import { timeService } from '../services/time-service';

export default class Thread extends React.Component {

    constructor() {
        super();

        this.state = {
            loadingComments: false
        };
    }

    _loadComments(linkUrl) {
        this.setState({ loadingComments: true });
        requestService.getThread(linkUrl)
            .then((response) => {
                console.log('loaded thread', response);
                this.setState({ loadingComments: false });
            });
    }

    _formatTime(timestamp) {
        return timeService.getFormattedUnixTime(timestamp);
    }

    componentDidMount() {
        this._loadComments(this.props.link.data.url);
        console.log('link prop', this.props.link);
    }

    render() {
        let bodyContent = this.state.loadingComments ? <LoadingIndicator /> : <div>Finished loading</div>;

        return(
            <div>
                <div className="thread card">
                    <div className="title">{ this.props.link.data.title }</div>
                    <p className="body">{ this.props.link.data.selftext }</p>
                    <div className="meta-data">
                        <a className="author">/u/{this.props.link.data.author}</a>
                        <span>{ this._formatTime(this.props.link.data.created_utc) }</span>
                    </div>
                </div>
                { bodyContent }
            </div>
        );
    }

}
