import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import App from "./components/app";
import reducers from "./reducers";
import ReduxPromise from 'redux-promise';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDom.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('container')
);
