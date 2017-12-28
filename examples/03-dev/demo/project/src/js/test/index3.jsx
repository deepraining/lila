
var React = require('react');
var ReactDOM = require('react-dom');

var Welcome = require('./wel.jsx');

ReactDOM.render(
    <Welcome name="John" />,
    document.getElementById('example')
);