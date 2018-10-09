import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import hugoIcon from '../../static/images/favicon.png';
import './Nav.css';

const NavContent = ({ navActive, onLinkClicked }) => {
    return (
        <div>
            <Navbar fluid fixedTop inverse>
                <Link to="/">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img onClick={ (e) => {onLinkClicked("/")} } alt="icon" className="navbar-icon" src={hugoIcon}/>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Link>
                <Nav className="hugo-social-links">
                    <NavItem target="_blank" eventKey={5} href="https://github.com/Krakcen">
                        <i className="hugo-social-link fa fa-github-square fa-hugo"/>
                    </NavItem>
                    <NavItem target="_blank" eventKey={6} href="https://www.linkedin.com/in/hugo-v">
                        <i className="hugo-social-link fa fa-linkedin-square fa-hugo"/>
                    </NavItem>
                    <NavItem target="_blank" eventKey={7} href="https://www.facebook.com/hugo.vlvieille.5">
                        <i className="hugo-social-link fa fa-facebook-square fa-hugo"/>
                    </NavItem>
                    <NavItem target="_blank" eventKey={8} href="https://www.instagram.com/minikracken">
                        <i className="hugo-social-link fa fa-instagram fa-hugo"/>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <IndexLinkContainer to="/">
                        <NavItem onClick={ (e) => {onLinkClicked("/")} } active={navActive[0]} eventKey={1} href="#">Home</NavItem>
                    </IndexLinkContainer>
                    {/* <LinkContainer to="/projects"> */}
                        <NavItem onClick={ (e) => {onLinkClicked("/projects")} } active={navActive[1]} eventKey={2} href="#">Projects (WIP)</NavItem>
                    {/* </LinkContainer>
                    <LinkContainer to="/gallery"> */}
                        <NavItem onClick={ (e) => {onLinkClicked("/gallery")} } active={navActive[2]} eventKey={3} href="#">Gallery (WIP)</NavItem>
                    {/* </LinkContainer> */}
                    <LinkContainer to="/about">
                        <NavItem onClick={ (e) => {onLinkClicked("/about")} } active={navActive[3]} eventKey={4} href="#">About</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavContent;