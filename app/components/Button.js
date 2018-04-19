import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default class Button extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object
  }
  render() {
    const {color, onClick} = this.props;
    const style = {
      backgroundColor: color
    };

    return (
      <button className="Button" style={style} onClick={onClick}>
        {this.props.children}   
      </button>
    );
  }
}