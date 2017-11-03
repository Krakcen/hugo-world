import { combineReducers } from 'redux';
import initStore from './initStore.js';

const dummyReducer = (state = initStore.hello, action) => {
    switch (action.type) {
        default:
            return (state);
    }
};

const reducers = combineReducers({
    dummyReducer: dummyReducer,
});

export default reducers;
