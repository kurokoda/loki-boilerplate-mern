import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../utils/route';
import Error from '../../container/page/error';

// TODO Add JSDoc comments

const Body = props => {
  const styles = Body.getStyles();

  return (
    <div id="body" className={css(styles.container)}>
      <Switch>
        {ROUTES.map(route => (
          <Route
            component={route.component}
            exact={route.exact}
            key={route.type}
            path={route.path}
            props={props}
          />
        ))}
        <Route component={Error} />
      </Switch>
    </div>
  );
};

Body.getStyles = () =>
  StyleSheet.create({
    container: {
      fontFamily: 'Avenir Next'
    }
  });

export default withRouter(Body);

// TODO Extract Error component
