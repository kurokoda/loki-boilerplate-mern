/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import { withRouter } from "react-router";
import Body from "../../container/body";
import Footer from "../../container/footer";
import Header from "../../container/header";
import Helmet from "./helmet";

/**
 * This is the top-level application component. It acts as the root of the component tree
 *
 * Children:
 * * `<ApplicationHelmet>`
 * * `<Header>`
 * * `<Body>`
 * * `<Footer>`
 *
 */

class App extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */

  componentDidMount() {
    const { history, analyticsPageViewAction } = this.props;
    let currentLocation = null;

    this.routeChangeListenerDismiss = history.listen(location => {
      if (currentLocation !== location.pathname) {
        analyticsPageViewAction(location.pathname);
        currentLocation = location.pathname;
      }
    });
  }

  componentWillUnmount() {
    this.routeChangeListenerDismiss();
  }

  shouldComponentUpdate = () => true;

  render() {
    return (
      <main>
        <Helmet />
        <Header {...this.props} />
        <Body {...this.props} />
        <Footer {...this.props} />
      </main>
    );
  }
}

export default withRouter(App);
