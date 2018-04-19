import React, {Component} from 'react';

import './SearchInput.css';

export default class SearchInput extends Component {
  state = {
    value: '',
  }
  onSubmit = e => {
    const {onSubmit} = this.props;
    if (e && e.preventDefault) e.preventDefault();
    if (this.state.value.length < 1) return;
    onSubmit(this.state.value.toLowerCase());
  }
  onChange = e => {
    this.setState({value: e.target.value});
  }
  onKeyDown = e => {
    if(e.key === 'Enter') this.onSubmit();
  }
  render() {
    return (
      <div className="SearchInput" onKeyDown={this.onKeyDown}>
        <input
          className="SearchInputBox"
          placeholder="Enter URL to shorten"
          value={this.state.value}
          onChange={this.onChange}
        />
        <button className="SearchButton" disabled={this.state.value < 1} onClick={this.onSubmit}>Shrink</button>
      </div>
    );
  }
}
