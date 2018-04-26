
import { Button } from 'antd';
import styles from './wel.css';
import styles2 from './wel2.less';

var React = require('react');

class Welcome extends React.Component {
    render() {
        return <Button>Hello, <span className={styles.btn + ' ' + styles2.btn2}>{this.props.name}</span></Button>;
    }
}

module.exports = Welcome;
