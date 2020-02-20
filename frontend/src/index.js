import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { StyleSheet } from 'aphrodite';
import { BrowserRouter } from 'react-router-dom';

const ssr = window.SSR_DATA || {};

const {
  initialState,
  renderedClassNames,
  data,
} = {
  ...ssr,
  initialState: {
    api: 'http://localhost:3000',
    ...(ssr.initialState || {})
  }
};

delete window.SSR_DATA;

ReactDOM.render(
  <BrowserRouter>
    <App {...initialState} data={data} />
  </BrowserRouter>,
  document.getElementById('root')
);

StyleSheet.rehydrate(renderedClassNames);

serviceWorker.unregister();