import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AttackPatterns from './components/AttackPatterns'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/attack-patterns" exact />
        <Route
          path="/attack-patterns"
          render={props => (
            <AttackPatterns/>
          )}
        />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
