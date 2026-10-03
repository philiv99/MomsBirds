import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers'
import App from "./App.jsx";
import windowDimensions from './core/util/windowdemensions';
import initGlobalHandlers from './core/util/globalHandlers.js';
import { screenResize } from './redux/actions/';
import birdLocationMiddleware from './redux/middleware/birdLocationMiddleware';

initGlobalHandlers();

// Create store with middleware and Redux DevTools support
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(birdLocationMiddleware)
  )
);

// window.addEventListener('resize', () => {
//   store.dispatch(screenResize(windowDimensions.getWindowWidth(), windowDimensions.getWindowWidth()));
// });

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);