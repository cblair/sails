import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ModelsToForms from "./modelsToForms/index.js";

const modelsToForms = new ModelsToForms();

console.log(modelsToForms.getRoutes())

export default function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <ul>
              {modelsToForms.getLinks().map(link => <li>{link}</li>)}
              <li><Link to="/test">Test</Link></li>
            </ul>
          </ul>
        </nav>
        <Switch>
          {modelsToForms.getRoutes()}
          <Route path="/test"><div>TEST</div></Route>
        </Switch>
      </div>
    </Router>
  );
};
