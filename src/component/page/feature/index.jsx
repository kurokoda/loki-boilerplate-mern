/** @module FeaturePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';
import { FEATURE as ROUTE_CONFIG } from '../../../utils/route/config';
import { localized } from '../../../utils/localization';
import Loading from '../../loading';
import Helmet from './helmet';

class FeaturePage extends Component {
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
    const classes = FeaturePage.getClasses();
    const { localization } = this.props;
    const title = localized(localization, ['feature', 'title']).toUpperCase();

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="feature-page" className={classes.container}>
            <Helmet />
            {title}
          </div>
        )}
        {// Browser or server render without data:
        //    display the loading component without Helmet
        !this.hasPageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  fetchPageData() {
    const { fetchPageData } = this.props;

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

FeaturePage.getClasses = () => {
  const styles = FeaturePage.getStyles();

  return {
    container: css(styles.container)
  };
};

FeaturePage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** The application's routing history */
  history: ReactRouterPropTypes.history.isRequired,
  /** Localization text */
  localization: ImmutablePropTypes.map.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

FeaturePage.defaultProps = {
  pageData: null
};

/**
 * Dynamically generates styles
 * @methodof FeaturePage
 * @returns {object} The class's styles
 */
FeaturePage.getStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)'
    }
  });

export default withRouter(FeaturePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
