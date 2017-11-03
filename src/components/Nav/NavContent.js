import React from 'react';
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';

import './Nav.css';

const NavContent = () => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">React-Bootstrap</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavContent;