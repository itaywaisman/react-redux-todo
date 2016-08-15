/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('app');


render(
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App store={store}/>
    </MuiThemeProvider>
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <MuiThemeProvider>
          <NextApp store={store}/>
        </MuiThemeProvider>
      </AppContainer>,
      mountApp
    );
  });
}
