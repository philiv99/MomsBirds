import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers'
import App from "./App.jsx";
import initGlobalHandlers from './core/util/globalHandlers.js';

initGlobalHandlers();
const store = createStore(rootReducer,   
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);