import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import './Footer.css';
import { ThirdParty } from './FooterTemplates.js';

const popoverClick = (
    <Popover id="popover-trigger-click-root-close">
        <div className="text-center">
            <ThirdParty/>
        </div>
    </Popover>
);

const Footer = () => {
    return (
        <footer className="hugo-footer">
            <div className="container text-center">
                Made with <i className="fa fa-heart heart-footer"/> in Lyon
                <span className="flag-icon flag-icon-fr hugo-flag-footer"/>
                -
                <OverlayTrigger rootClose trigger="click" placement="top" overlay={popoverClick}>
                    <a className="hugo-link-text" href="/" onClick={(e) => { e.preventDefault() }}> Third-party list</a>
                </OverlayTrigger>
            </div>
        </footer>
    );
};

export default Footer;