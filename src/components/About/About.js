import React from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import aboutImage from '../../static/images/front-page-image-container-alpha.png';

import './About.css';

const About = () => {
    return (
        <div className="main-content hugo-about">
            <Grid fluid>
                <Row>
                    <Col smOffset={2} sm={4}>
                        <Image src={aboutImage} responsive />
                    </Col>
                    <Col sm={4} className="hugo-about-text">
                        <h1 className="text-center">About Me</h1>
                        <p>
                            Maecenas placerat ligula mi, vitae semper ex condimentum nec. Nulla at pretium massa. Mauris vitae quam sollicitudin, Maecenas vestibulum vitae nibh quis mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Maecenas placerat ligula mi, vitae semper ex condimentum nec. Nulla at pretium massa. Mauris vitae quam sollicitudin, Maecenas vestibulum vitae nibh quis mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Maecenas placerat ligula mi, vitae semper ex condimentum nec. Nulla at pretium massa. Mauris vitae quam sollicitudin, Maecenas vestibulum vitae nibh quis mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Maecenas placerat ligula mi, vitae semper ex condimentum nec. Nulla at pretium massa. Mauris vitae quam sollicitudin, Maecenas vestibulum vitae nibh quis mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default About;