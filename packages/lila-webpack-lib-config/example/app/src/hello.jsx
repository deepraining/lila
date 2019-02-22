import React, { Component } from 'react';
import './hello.less';

export default class extends Component {
  render() {
    const { name } = this.props;

    return (
      <button type="button" className="jsx-btn">
        Hello, {name}
      </button>
    );
  }
}
