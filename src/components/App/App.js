import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import './App.css';

//Redux
import reducers from '../../redux/reducers.js';

//Utils
import { bounceTransition } from '../../utils/transitions.js';

//Components
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import HomePage from '../HomePage/HomePage.js';
import About from '../About/About.js';
import Projets from '../Projects/Projects.js';
import Gallery from '../Gallery/Gallery.js';
import NotFound from '../404/404.js';


function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
        position: (styles.foo <= 1) ? 'relative': 'absolute',
        width: '100%',
        height: '100%',
    };
}

class App extends Component {
    constructor(props) {
        super(props);

        this.store = createStore(reducers, applyMiddleware(thunk));
    }
    render() {
        return (
            <Provider store={this.store}>
                <Router history={this.history}>
                    <div>
                        <Nav/>
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="switch-wrapper"
                        >
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/about" component={About}/>
                            <Route path="/projects" component={Projets}/>
                            <Route path="/gallery" component={Gallery}/>
                            <Route component={NotFound}/>
                        </AnimatedSwitch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
};

export default App;
