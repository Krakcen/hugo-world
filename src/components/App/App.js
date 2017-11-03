import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

//Redux
import reducers from '../../redux/reducers.js';

//Components
import Nav from '../Nav/Nav.js';
import HomePage from '../HomePage/HomePage.js';
import About from '../About/About.js';
import Projets from '../Projects/Projects.js';
import Gallery from '../Gallery/Gallery.js';
import NotFound from '../404/404.js';

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
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/about" component={About}/>
                            <Route path="/projects" component={Projets}/>
                            <Route path="/gallery" component={Gallery}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
};

export default App;
