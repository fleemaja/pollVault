import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import { setAuthorizationToken } from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, setCurrentUserPhoto } from './actions/users';
import { getCurrentUserPhoto } from './utils/users';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
)

// asyncronously load google font to avoid render blocking stylesheet
WebFont.load({
  google: {
    families: ['Roboto:300,400,700']
  }
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  getCurrentUserPhoto()
    .then(res => store.dispatch(setCurrentUserPhoto(res.data.photo)))
}

registerServiceWorker();
