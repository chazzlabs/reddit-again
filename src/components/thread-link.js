import React from 'react';
import moment from 'moment';

export default class ThreadLink extends React.Component {

    _getFormattedTime(timestamp) {
        return moment.unix(timestamp).fromNow();
    }

    _getTitleClassnames(linkData) {
        const classnames = 'title';

        return linkData.stickied ? `${classnames} sticky` : classnames;
    }

    render() {
        return(
            <div className="thread-link card">
                <div className={this._getTitleClassnames(this.props.link.data)}>{this.props.link.data.title}</div>
                <div className="meta-data">
                    <a className="author">/u/{this.props.link.data.author}</a>
                    <span>{this._getFormattedTime(this.props.link.data.created_utc)}</span>
                </div>
            </div>
        );
    }

}
