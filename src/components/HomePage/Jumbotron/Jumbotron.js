import React, { Component } from 'react';
import { connect } from 'react-redux';

import { paper } from 'paper';

import './Jumbotron.css';

class Jumbotron extends Component {
    constructor(props) {
        super(props);

        this.canvas = null;
    }
    componentDidMount() {
        this.canvas = document.getElementById('hugo-jumbotron');
        paper.setup(this.canvas);

        //setup line
        var path = new paper.Path.Rectangle({
            point: [300, 300],
            size: [75, 75],
            strokeColor: 'black'
        });
        var circle = new paper.Path.Circle({
            center: paper.view.center,
            radius: 70,
            fillColor: 'red'
        });
        //

        paper.view.onFrame = function(event) {
            path.rotate(3);
            circle.fillColor.hue += 3;
        };
        paper.view.draw();
    }
    render() {
        return (
            <div>
                <canvas id="hugo-jumbotron"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);