import React, {Component} from 'react';
import {Button} from 'antd';
import styles from './hello.less';

export default class extends Component {
  render() {
    return (
      <div>
        <button type="button" className={styles.btn} style={{marginRight: '20px'}}>
          Hello,
          {' '}
          {this.props.name}
        </button>
        <Button>antd</Button>
      </div>
    );
  }
}
