import React, {Component} from 'react';
import styles from './hello.less';

export default class extends Component {
  render() {
    return (
      <button type="button" className={styles.btn}>
        Hello,
        {' '}
        {this.props.name}
      </button>
    );
  }
}
