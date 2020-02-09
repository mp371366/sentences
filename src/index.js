import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { StyleSheet } from 'aphrodite';

const {
  initialState,
  renderedClassNames
} = window.SSR_DATA;

delete window.SSR_DATA;

ReactDOM.hydrate(<App {...initialState} />, document.getElementById('root'));

StyleSheet.rehydrate(renderedClassNames);

serviceWorker.unregister();