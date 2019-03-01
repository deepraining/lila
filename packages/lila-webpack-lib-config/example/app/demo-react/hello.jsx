import React, { Component } from 'react';
import './hello.less';

export default class extends Component {
  render() {
    const { name } = this.props;

    return (
      <div>
        <button type="button" className="btn">
          Hello, {name}
        </button>
      </div>
    );
  }
}
