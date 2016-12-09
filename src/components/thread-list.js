import React from 'react';

import ThreadLink from './thread-link';

export default class ThreadList extends React.Component {

    render() {
        return(
            <div>
                {this.props.links.map(link => <ThreadLink key={link.data.id} link={link} />)}
            </div>
        );
    }

}
