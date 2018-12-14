/** @module FeaturesPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { FEATURES as ROUTE_CONFIG } from '../../../utils/route/config';
import { localized } from '../../../utils/localization';

import Loading from '../../loading';
import Helmet from './helmet';
import Category from './category';

class FeaturesPage extends Component {
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
    const classes = FeaturesPage.getClasses();
    const { localization, pageData } = this.props;
    const title = localized(localization, ['features', 'title']).toUpperCase();

    let categories;

    if (this.hasPageData) {
      categories = pageData.get('categories');
    }

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="features-page" className={classes.container}>
            <Helmet />
            <h3>{title}</h3>
            {categories.map(category => (
              <Category category={category} key={category.get('name')} />
            ))}
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

FeaturesPage.getClasses = () => {
  const styles = FeaturesPage.getStyles();

  return {
    container: css(styles.container)
  };
};

FeaturesPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Localization text */
  localization: ImmutablePropTypes.map.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

FeaturesPage.defaultProps = {
  pageData: null
};

/**
 * Dynamically generates styles
 * @methodof FeaturesPage
 * @returns {object} The class's styles
 */
FeaturesPage.getStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)',
      padding: '0 40px 0 40px',
      width: '100%'
    }
  });

export default withRouter(FeaturesPage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
