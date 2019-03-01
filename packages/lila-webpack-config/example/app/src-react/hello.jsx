import React, { Component } from 'react';
import styles from './hello.less';

export default class extends Component {
  render() {
    const { name } = this.props;

    return (
      <div>
        <button type="button" className={styles.btn}>
          Hello, {name}
        </button>
      </div>
    );
  }
}
