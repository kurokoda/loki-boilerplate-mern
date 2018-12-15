/** @module WelcomePage */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect, withRouter } from 'react-router';
import Well from '../../well';
import Helmet from './helmet';
import style from '../../../theme';
import { localize } from '../../../utils/strings';
import { ApplicationContext } from '../../../context/application';

class WelcomePage extends Component {
  static contextType = ApplicationContext;
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
    const strings = this.context.strings;
    const classes = WelcomePage.getClasses();
    const { user } = this.props;
    const title = localize(strings, ['welcome', 'title']).toUpperCase();
    const subtitle = localize(strings, ['welcome', 'subtitle']).toUpperCase();
    const paragraphOne = localize(strings, ['welcome', 'paragraphOne']);
    const paragraphTwo = localize(strings, ['welcome', 'paragraphTwo']);
    const paragraphThree = localize(strings, ['welcome', 'paragraphThree']);
    const paragraphFour = localize(strings, ['welcome', 'paragraphFour']);

    return (
      <Fragment>
        {// Redirect if there is no user
        !user && <Redirect to="/" />}
        <div id="home-page" className={classes.container}>
          <Helmet />
          <Well>
            <h3 className={classes.header}>{title}</h3>
            <h5 className={classes.header}>{subtitle}</h5>
            <p className={classes.text}>
              {paragraphOne}
            </p>
            <br />
            <p className={classes.text}>
              {paragraphTwo}
            </p>
            <br />
            <p className={classes.text}>
              {paragraphThree}
            </p>
            <br />
            <p className={classes.text}>
              {paragraphFour}
            </p>
            <br />
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
