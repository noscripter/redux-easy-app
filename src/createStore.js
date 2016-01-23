import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import history from './history';

export default function(reducers, initialState, routes) {

    const reducer = combineReducers(Object.assign({}, reducers, {
        routing: routeReducer
    }));

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    const store = new createStoreWithMiddleware(reducer, initialState);

    const isBrowser = window !== undefined && window.__CLIENT_;
    if (isBrowser) {
        syncReduxAndRouter(history, store);
    }

    return store;
}
