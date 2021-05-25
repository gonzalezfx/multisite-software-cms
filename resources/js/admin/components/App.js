import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../utils/history';
import { ROUTES } from './../utils/routes';
import { withGeneralProps } from './hocs/withGeneralProps';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        {Object.values(ROUTES).map(route => {
          const { component, ...routeProps } = route;
          return (
            <Route {...routeProps} component={withGeneralProps(component)} />
          );
        })}
      </Switch>
    </Router>
  );
};

export default App;
