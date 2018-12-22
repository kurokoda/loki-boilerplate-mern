import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ROUTES } from '../../utils/route';
import ErrorContainer from '../../container/page/error';
import ErrorComponent from '../../component/page/error';


// TODO Add JSDoc comments

const Body = props => {
  const styles = Body.getStyles();
  const { location } = props;

  return (
    <div id="body" className={css(styles.bodyContainer)}>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'pageFade'}
        >
          <section className="route-section">
            <Switch location={location}>
              {ROUTES.map(route => {
                const Container = route.container;
                const Layout = route.component;
                return (
                  <Route
                    render={props => <Container {...props} Layout={Layout} />}
                    exact={route.exact}
                    key={route.type}
                    path={route.path}
                    props={props}
                  />
                );
              })}
              <Route render={props => <ErrorContainer {...props} Layout={ErrorComponent} />} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

Body.getStyles = () =>
  StyleSheet.create({
    bodyContainer: {}
  });

export default withRouter(Body);

// TODO Extract Error component
