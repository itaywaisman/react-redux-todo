import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './pages/Layout/Layout';

// require.ensure polyfil for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  }
}


if (process.env.NODE_ENV !== 'production') {
  require('./pages/TodoList/TodoList');
}

export default (
  <Route path='/' component={Layout}>
    <IndexRoute
      getComponent={(nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./pages/TodoList/TodoList').default);
        });
      }}
    />
  </Route>
);
