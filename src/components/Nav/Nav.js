import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setNavActive } from '../../redux/actions.js'
import NavContent from './NavContent.js';

class Nav extends Component {
    constructor(props) {
        super(props);

        this.hello = "Hello World";
        this.onLinkClicked = this.onLinkClicked.bind(this);
    }
    onLinkClicked(link) {
        switch (link) {
            case "/":
                this.props.onNavLinkClicked([true, false, false, false]);
                return (0);
            case "/projects":
                //this.props.onNavLinkClicked([false, true, false, false]);
                return (0);
            case "/gallery":
                //this.props.onNavLinkClicked([false, false, true, false]);
                return (0);
            case "/about":
                this.props.onNavLinkClicked([false, false, false, true]);
                return (0);
            default:
                this.props.onNavLinkClicked([true, false, false, false]);
                return (-1);
        }
    }
    render() {
        return (
            <div>
                <NavContent onLinkClicked={this.onLinkClicked} navActive={this.props.navActive}/>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return ({
        rState: state,
        navActive: state.navActive,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        onNavLinkClicked: (tab) => { dispatch(setNavActive(tab)); },
    });
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);