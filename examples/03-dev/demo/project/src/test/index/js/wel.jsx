
import { Button } from 'antd';

var React = require('react');

class Welcome extends React.Component {
    render() {
        return <Button>Hello, {this.props.name}</Button>;
    }
}

module.exports = Welcome;