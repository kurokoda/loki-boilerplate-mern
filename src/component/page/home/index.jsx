/** @module HomePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { HOME as ROUTE_CONFIG } from '../../../utils/route/config';
import Loading from '../../loading';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class HomePage extends Component {
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
    console.log('hasPageData', this.hasPageData);
    !this.hasPageData && this.fetchPageData();

    window.scrollTo(0, 0);
  }

  render() {
    const classes = HomePage.getClasses();
    const { localization } = this.props;
    const title = localization.getIn(['home', 'title']).toUpperCase();

    return (
      <Fragment>
        {// render with data:
        // display the page normally
        this.hasPageData && (
          <div id="home-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{title}</h3>
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
  fetchPageData: PropTypes.func.isRequired /** Localization text */,
  localization: ImmutablePropTypes.map.isRequired /** Page data */,
  pageData: ImmutablePropTypes.map
};

HomePage.defaultProps = {
  pageData: null
};

export default withRouter(HomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
