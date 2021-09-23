import React from 'react';
import ReactDOM from 'react-dom';
import * as log from 'loglevel';

import App from "./app.js";

// TODO - set off of env/etc
log.setLevel('DEBUG');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
