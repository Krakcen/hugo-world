import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import './Nav.css';

const NavContent = ({ navActive, onLinkClicked }) => {
    return (
        <div>
            <Navbar fluid fixedTop inverse>
                <Link to="/">
                    <Navbar.Header>
                        <Navbar.Brand>
                                <img alt="icon" className="navbar-icon" src="/favicon.png"/>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Link>
                <Nav pullRight>
                    <IndexLinkContainer to="/">
                        <NavItem onClick={ (e) => {onLinkClicked("/")} } active={navActive[0]} eventKey={1} href="#">Home</NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to="/projects">
                        <NavItem onClick={ (e) => {onLinkClicked("/projects")} } active={navActive[1]} eventKey={2} href="#">Projects</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/gallery">
                        <NavItem onClick={ (e) => {onLinkClicked("/gallery")} } active={navActive[2]} eventKey={3} href="#">Gallery</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <NavItem onClick={ (e) => {onLinkClicked("/about")} } active={navActive[3]} eventKey={4} href="#">About</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavContent;