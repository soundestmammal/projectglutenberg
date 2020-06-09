import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './Root';
import App from './components/App';

ReactDOM.render(
  <Root>
    <Router>
      <App>

      </App>
    </Router>
  </Root>,
  document.querySelector("#root")
);