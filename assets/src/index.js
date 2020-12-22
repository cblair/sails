import React from 'react';
import ReactDOM from 'react-dom';
import * as log from 'loglevel';

import App from "./app.js";

// TODO - set of of env/etc
log.setLevel('DEBUG');

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
