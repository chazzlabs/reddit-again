import React from 'react';

import { timeService } from '../services/time-service';

export default class ThreadLink extends React.Component {

    _getTitleClassnames(linkData) {
        const classnames = 'title';
        return linkData.stickied ? `${classnames} sticky` : classnames;
    }

    _formatTime(timestamp) {
        return timeService.getFormattedUnixTime(timestamp);
    }

    render() {
        return(
            <div className="thread-link card" onClick={ this.props.onLinkClick.bind(this, this.props.link) }>
                <div className={this._getTitleClassnames(this.props.link.data)}>{this.props.link.data.title}</div>
                <div className="meta-data">
                    <a className="author">/u/{this.props.link.data.author}</a>
                    <span>{ this._formatTime(this.props.link.data.created_utc) }</span>
                </div>
            </div>
        );
    }

}
