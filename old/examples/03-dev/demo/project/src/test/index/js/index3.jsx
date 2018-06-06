
const React = require('react');
const ReactDOM = require('react-dom');

const Welcome = require('./wel.jsx');

ReactDOM.render(
    <Welcome name="John" />,
    document.getElementById('example')
);
