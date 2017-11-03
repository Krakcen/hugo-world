import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContent from './NavContent.js';

class Nav extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <NavContent/>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return ({
        myState: state,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({

    });
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);