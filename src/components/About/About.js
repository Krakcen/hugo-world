import React from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { connect } from 'react-redux';


import { setImageLoad } from '../../redux/actions.js';
import aboutImage from '../../static/images/front-page-image-container-alpha.png';
import loaderEclipse from '../../static/images/loader_eclipse.svg';
import './About.css';

const About = ({imgAboutState, onImageLoadAbout}) => {
    return (
        <div className="main-content hugo-about">
            <Grid fluid>
                <Row>
                    <Col smOffset={2} sm={4}>
                        <div>
                            { imgAboutState ? null : <div className="text-center about-image-placeholder"><Image src={loaderEclipse}/></div> }
                            <Image
                                style={imgAboutState ? {} : {display: 'none'}}
                                onLoad={() => {onImageLoadAbout(true)}}
                                src={aboutImage} responsive
                            />
                        </div>
                    </Col>
                    <Col sm={4} className="hugo-about-text">
                        <h1 className="text-center">About Me</h1>
                        <p>
                            I am a freelance web developer, studying at EPITECH, Lyon.
                            My greatest interest in programming is being part of the JavaScript open-source community, that helps me building full JS server/client web apps i can be proud of.
                            <br/>
                            When i'm not working, i like to go skating the streets of Lyon, or gaming. I also like to cook and take photos.                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return ({
        imgAboutState: state.imageLoad.about,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        onImageLoadAbout: (imageState) => { dispatch(setImageLoad('SET_IMG_LOAD_ABOUT', imageState)); },
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(About);