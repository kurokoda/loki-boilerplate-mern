/** @module WelcomePage */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect, withRouter } from 'react-router';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class WelcomePage extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Resets page position
   * @returns {void}
   */
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const classes = WelcomePage.getClasses();
    const { user } = this.props;

    return (
      <Fragment>
        {// Redirect if there is no user
        !user && <Redirect to="/" />}
        <div id="home-page" className={classes.container}>
          <Helmet />
          <Well>
            <h3 className={classes.header}>SECRET WELCOME PAGE</h3>
            <h5 className={classes.text}>
              A scalable react application foundation with a focus on
              developer experience, performance, and best practices.
            </h5>
            <h5 className={classes.text}>
              My goal was to move beyond the repetitive coding and copy-pasting involved in getting a full-fledged isomorphic web application running, in order to allow me to focus on the application-specific features. In other words, I wanted to get to the fun stuff as quickly as possible.
            </h5>
            <h5 className={classes.text}>
              Food truck tbh art party yr. Gochujang crucifix palo santo, slow-carb hexagon flannel small batch neutra austin. Pok pok slow-carb quinoa, tbh occupy cronut bushwick. 3 wolf moon marfa vice live-edge. Schlitz bitters direct trade retro 8-bit lo-fi truffaut stumptown tacos banh mi kale chips knausgaard pop-up migas.
            </h5>
          </Well>
        </div>
      </Fragment>
    );
  }
}

WelcomePage.getClasses = () => {
  const styles = WelcomePage.getStyles();

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof HomePage
 * @returns {object} The class's styles
 */
WelcomePage.getStyles = () =>
    StyleSheet.create({
      container: {
        minHeight: 'calc(100vh-100px)',
        padding: '0 40px 0 40px',
        width: '100%'
      },
      header: {
        color: style.about.color.headerText,
        textTransform: 'uppercase'
      },
      text: {
        color: style.about.color.text,
        fontSize: '18px'
      }
    });

WelcomePage.propTypes = {
  user: ImmutablePropTypes.map.isRequired
};

export default withRouter(WelcomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
