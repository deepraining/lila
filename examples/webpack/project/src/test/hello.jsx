import React, {Component} from 'react';
import styles from './hello.less';

export default class extends Component {
  render() {
    return (
      <button type="button">
        Hello, 
        {' '}
        <span className={styles.btn}>{this.props.name}</span>
      </button>
    );
  }
}
