import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { setJumboLoad, setImageLoad } from '../../../redux/actions.js';
import loaderEclipse from '../../../static/images/loader_eclipse.svg';
import './Jumbotron.css';
import { startJumbo } from './startJumbo.js';


import hugoText from '../../../static/images/jumbotron/hugo-text.png';
import space from '../../../static/images/jumbotron/space.jpg';
import moonBootstrap from '../../../static/images/jumbotron/moon-bootstrap.png';
import moonCsgo from '../../../static/images/jumbotron/moon-csgo.png';
import moonEpitech from '../../../static/images/jumbotron/moon-epitech.png';
import moonGithub from '../../../static/images/jumbotron/moon-github.png';
import moonMeteor from '../../../static/images/jumbotron/moon-meteor.png';
import moonReact from '../../../static/images/jumbotron/moon-react.png';
import moonReactRouter from '../../../static/images/jumbotron/moon-react-router.png';
import moonRedux from '../../../static/images/jumbotron/moon-redux.png';
import moonSkateboard from '../../../static/images/jumbotron/moon-skateboard.png';
import moonSlack from '../../../static/images/jumbotron/moon-slack.png';
import moonTrello from '../../../static/images/jumbotron/moon-trello.png';
import moonWebstorm from '../../../static/images/jumbotron/moon-webstorm.png';


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
        if (this.imagesLoadState.length === 14 && (!this.props.imageJumboState)) {
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
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={hugoText} id="hugo-text-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={space} id="space-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonBootstrap} id="bootstrap-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonCsgo} id="csgo-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonEpitech} id="epitech-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonGithub} id="github-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonMeteor} id="meteor-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonReact} id="react-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonReactRouter} id="reactrouter-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonRedux} id="redux-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonSkateboard} id="skateboard-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonSlack} id="slack-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonTrello} id="trello-logo-jumbo"/>
                    <img onLoad={(e) => {this.imagesLoaded(e)}} alt="none" src={moonWebstorm} id="webstorm-logo-jumbo"/>
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