import { combineReducers } from 'redux';
import initStore from './initStore.js';

const navActive = (state = initStore.navActive, action) => {
    switch (action.type) {
        case 'SET_NAV_ACTIVE':
            return (action.payload);
        default:
            return (state);
    }
};

const imageLoad = (state = initStore.imageState, action) => {
    switch (action.type) {
        case 'SET_IMG_LOAD_ABOUT':
            return (Object.assign({}, state, {about: action.payload}));
        default:
            return (state);
    }
};

const reducers = combineReducers({
    navActive: navActive,
    imageLoad: imageLoad,
});

export default reducers;
