import React, {Component} from 'react';
const axios = require('axios');
const copy = require('copy-to-clipboard');

// styles
import './App.css';

// components
import SearchInput from './SearchInput';
import Button from './Button';

export default class App extends Component {
  state = {
    isFetching: false,
    shortUrl: null,
    error: null,
    copied: false
  }
  onCopyToClipboard = () => {
    this.setState({copied: true});
    copy(this.state.shortUrl);
  }
  onSubmit = value => {
    const header = 'http://';
    const url = value.startsWith(header) ? value : `${header}${value}`;
    this.setState({isFetching: true});
    axios.post('/api/shorten', {
      url
    })
    .then(res => {
      this.setState({shortUrl: res.data.shortUrl, error: null, copied: false, isFetching: false})
    })
    .catch(error => {
      this.setState({error: 'There was an error shortening the URL, please try again.', shortUrl: null, copied: false, isFetching: false})
    });
  }
  renderLoading() {
    const {isFetching} = this.state;
    if(!isFetching) return null;

    return (
      <div>
        <h3>Shortening...</h3>
      </div>
    )
  }
  renderShort() {
    const {isFetching, shortUrl, copied} = this.state;

    if(isFetching) return null;
    if(!shortUrl) return null;

    const buttonColor = copied ? '#2C3E50' : '#FC4349';
    const buttonText = copied ? 'Copied! Click to copy again' : 'Copy to clipboard'; 
    return (
      <div className="Url">
        <a href={shortUrl} target="_blank" className="big-url">{shortUrl}</a>
        <br/>
        <Button color={buttonColor} style={{width: 150}} onClick={this.onCopyToClipboard}>{buttonText}</Button>
      </div>
    )
  }
  render() {
    const {error} = this.state;
    return (
      <div className="App" onKeyDown={this.handleKeyPress} tabIndex="0">
        <h1>Hyperlink Shrinker</h1>
        <SearchInput onSubmit={this.onSubmit}/>
        {this.renderLoading()}
        {this.renderShort()}
        {error && <small>{error}</small>}
      </div>
    );
  }
}