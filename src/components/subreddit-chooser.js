import React from 'react';

export default class SubredditChooser extends React.Component {

    constructor() {
        super();

        this.state = {
            selectedId: 'default'
        };
    }

    componentDidMount() {
        this._selectOption({ target: { value: this.state.selectedId } });
    }

    _selectOption(event) {
        if (event.target.value !== this.state.selectedId) {
            this.setState({ selectedId: event.target.value });
            this.props.onSelect(event.target.value);
        }
    }

    render() {
        return(
            <select value={this.state.selectedId} onChange={this._selectOption.bind(this)}>
                <option disabled="disabled">Choose a subreddit</option>
                {this.props.listings.map(listing => <option value={listing.data.id} key={listing.data.id}>{listing.data.display_name}</option>)}
            </select>
        );
    }

}
