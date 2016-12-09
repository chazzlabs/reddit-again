import React from 'react';

export default class SubredditChooser extends React.Component {

    constructor() {
        super();

        this.state = {
            selected: {
                id: 'default'
            }
        };
    }

    componentDidMount() {
        this._selectOption({ target: { value: this.state.selected.id } });
    }

    _selectOption(event) {
        const selected = this.state.selected;
        selected.id = event.target.value;
        this.setState({ selected: selected });
        this.props.onSelect(event.target.value);
    }

    render() {
        return(
            <select value={this.state.selected.id} onChange={this._selectOption.bind(this)}>
                <option disabled="disabled">Choose a subreddit</option>
                {this.props.listings.map(listing => <option value={listing.data.id} key={listing.data.id}>{listing.data.display_name}</option>)}
            </select>
        );
    }

}
