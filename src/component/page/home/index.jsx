/** @module HomePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import style from '../../../theme';
import { localize } from '../../../utils/strings';
import { HOME as ROUTE_CONFIG } from '../../../utils/route/config';

import Loading from '../../loading';
import Well from '../../well';
import Helmet from './helmet';
import { ApplicationContext } from '../../../context/application';

class HomePage extends Component {
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
   * Fetches page data, resets page position, and adds onResize event listener
   * @returns {void}
   */
  componentDidMount() {
    !this.hasPageData && this.fetchPageData();

    window.scrollTo(0, 0);
  }

  render() {
    const strings = this.context.strings;
    const classes = HomePage.getClasses();
    const title = localize(strings, ['home', 'title']).toUpperCase();
    const subtitle = localize(strings, [
      'home',
      'subtitle'
    ]).toUpperCase();
    const paragraphOne = localize(strings, ['home', 'paragraphOne']);
    const paragraphTwo = localize(strings, ['home', 'paragraphTwo']);
    const paragraphThree = localize(strings, ['home', 'paragraphThree']);
    const paragraphFour = localize(strings, ['home', 'paragraphFour']);

    return (
      <Fragment>
        {// render with data:
        // display the page normally
        this.hasPageData && (
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
        )}
        {// Browser or server render without data:
        // display the loading component without Helmet
        !this.hasPageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  fetchPageData() {
    const { fetchPageData } = this.props;
    console.log('fetching page data');
    fetchPageData(
      ROUTE_CONFIG.type,
      this.onFetchPageDataSuccess,
      this.onFetchPageDataError
    );
  }

  onFetchPageDataSuccess = () => {}; // tslint:disable-line:no-empty

  onFetchPageDataError = error => {}; // tslint:disable-line:no-empty

  get hasPageData() {
    const { pageData } = this.props;
    return pageData && pageData.get('pageType') === ROUTE_CONFIG.type;
  }
}

HomePage.getClasses = () => {
  const styles = HomePage.getStyles();

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
HomePage.getStyles = () =>
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

HomePage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  // TODO
  pageData: ImmutablePropTypes.map
};

HomePage.defaultProps = {
  pageData: null
};

export default withRouter(HomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
