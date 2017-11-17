import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Jumbotron.css';
import { startJumbo } from './startJumbo.js';

import boostrap from '../../../static/images/jumbotron/bootstrap_icon.png';
import github from '../../../static/images/jumbotron/github_icon.png';
import heroku from '../../../static/images/jumbotron/heroku_icon.png';
import meteor from '../../../static/images/jumbotron/meteor_icon.png';
import react from '../../../static/images/jumbotron/react_icon.png';
import slack from '../../../static/images/jumbotron/slack_icon.png';
import trello from '../../../static/images/jumbotron/trello_icon.png';

class Jumbotron extends Component {
    constructor(props) {
        super(props);

        this.canvas = null;
    }
    componentDidMount() {
        startJumbo(document.getElementById('hugo-jumbotron'));
    }
    render() {
        return (
            <div>
                <canvas id="hugo-jumbotron"/>
                <div style={{display:'none'}}>
                    <img alt="none" src={boostrap} id="bootstrap-logo-jumbo"/>
                    <img alt="none" src={github} id="github-logo-jumbo"/>
                    <img alt="none" src={heroku} id="heroku-logo-jumbo"/>
                    <img alt="none" src={meteor} id="meteor-logo-jumbo"/>
                    <img alt="none" src={react} id="react-logo-jumbo"/>
                    <img alt="none" src={slack} id="slack-logo-jumbo"/>
                    <img alt="none" src={trello} id="trello-logo-jumbo"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);