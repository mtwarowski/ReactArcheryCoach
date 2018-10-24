import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import 'core-js/es6/promise';
import 'core-js/es6/symbol';
import 'isomorphic-fetch';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
