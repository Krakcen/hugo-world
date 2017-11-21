import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { setJumboLoad, setImageLoad } from '../../../redux/actions.js';
import loaderEclipse from '../../../static/images/loader_eclipse.svg';
import './Jumbotron.css';
import { startJumbo } from './startJumbo.js';

import boostrap from '../../../static/images/jumbotron/bootstrap_icon.png';
import github from '../../../static/images/jumbotron/github_icon.png';
import heroku from '../../../static/images/jumbotron/heroku_icon.png';
import meteor from '../../../static/images/jumbotron/meteor_icon.png';
import react from '../../../static/images/jumbotron/react_icon.png';
import slack from '../../../static/images/jumbotron/slack_icon.png';
import trello from '../../../static/images/jumbotron/trello_icon.png';
import space1 from '../../../static/images/jumbotron/space1.jpg';
import space2 from '../../../static/images/jumbotron/space2.jpg';

class Jumbotron extends Component {
    constructor(props) {
        super(props);

        this.imagesLoadState = [];
        this.jumboStarted = false;
        this.canvas = null;
        this.paperProject = null;

    }
    imagesLoaded(e = false) {
        if (e)
            this.imagesLoadState.push(e.target.id);
        if (this.imagesLoadState.length === 9 && (!this.props.imageJumboState)) {
            this.props.setJumboState(true);
            this.props.setImageLoad(true);
            this.jumboStarted = true;
            this.paperProject = startJumbo(document.getElementById('hugo-jumbotron'));
        }
    }
    componentWillUnmount() {
        this.props.setJumboState(false);
        this.paperProject.clear();
    }
    componentDidMount() {
        if (this.props.imageJumboState) {
            setTimeout(() => {
                this.props.setJumboState(true);
                this.paperProject = startJumbo(document.getElementById('hugo-jumbotron'));
            }, 1000);
        }
    }

    render() {
        return (
            <div>
                <canvas style={this.props.jumboState ? {} : {display: 'none'}} width={window.innerWidth} height={window.innerHeight - 80} id="hugo-jumbotron"/>
                { this.props.jumboState
                    ? null
                    : <div style={{ height: window.innerHeight - 80, width: window.innerWidth, paddingTop: (window.innerHeight - 140) / 3 }} className="hugo-jumbotron-loading text-center">
                        <h1>Loading</h1>
                        <Image src={loaderEclipse}/>
                    </div>
                }
                <div ref="jumboImageList" style={{display:'none'}}>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={space1} id="space1-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={space2} id="space2-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={boostrap} id="bootstrap-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={github} id="github-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={heroku} id="heroku-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={meteor} id="meteor-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={react} id="react-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={slack} id="slack-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={trello} id="trello-logo-jumbo"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        imageJumboState: state.imageLoad.jumbo,
        jumboState: state.jumboLoad,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        setImageLoad: (imageState) => { dispatch(setImageLoad('SET_IMG_LOAD_JUMBO', imageState)) },
        setJumboState: (jumboState) => { dispatch(setJumboLoad(jumboState)) },
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);