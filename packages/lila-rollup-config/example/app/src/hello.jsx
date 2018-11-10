import React from 'react';
import './hello.less';

export default class extends React.Component {
  render() {
    return (
      <button type="button" className='jsx-btn'>
        Hello,
        {' '}
        {this.props.name}
      </button>
    );
  }
}
