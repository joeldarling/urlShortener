import React, {Component} from 'react';

import './SearchInput.css';

export default class SearchInput extends Component {
  state = {
    value: '',
  }
  onSubmit = () => {
    const {onSubmit} = this.props;
    if(this.state.value.length < 1) return;
    onSubmit(this.state.value.toLowerCase());
  }
  onChange = e => {
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <div className="SearchInput">
        <input
          className="SearchInputBox"
          placeholder="Enter URL to shorten"
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="SearchButton" onClick={this.onSubmit}>Shorten</div>          
      </div>
    );
  }
}