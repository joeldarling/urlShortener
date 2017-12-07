import React, {Component} from 'react';

import './Button.css';

export default class Button extends Component {
  render() {
    const {color, onClick} = this.props;
    const style = {
      backgroundColor: color
    };

    return (
      <div className="Button" style={style} onClick={onClick}>
        {this.props.children}   
      </div>
    );
  }
}