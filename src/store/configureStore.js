import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import logger from 'redux-logger'

let createStoreWithMiddleware

if (process.env.NODE_ENV == 'production') {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger())(createStore);
}

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}