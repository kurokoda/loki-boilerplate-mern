/** @module FeaturesPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { FEATURES as ROUTE_CONFIG } from '../../../utils/route';
import { localize } from '../../../utils/strings';
import Loading from '../../loading';
import Helmet from './helmet';
import Category from './category';
import { ApplicationContext } from '../../../context/application';
import Well from '../../well';

class FeaturesPage extends Component {

  connectionAttemptsAllowed = 5;
  connectionAttempts = 0;

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
    const theme = this.context.theme;
    const classes = FeaturesPage.getClasses({ theme });
    const { navigateToPage } = this.props;
    const title = localize(strings, ['features', 'title']).toUpperCase();

    let categories;
    let normalizedPageData;

    if (this.hasPageData) {
      normalizedPageData = this.normalizePageData();
      categories = normalizedPageData.get('categories');
    }

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="features-page" className={classes.container}>
            <Helmet />
            <h3 className={classes.header}>{title}</h3>
            <Well>
              {categories.map(category => (
                <Category
                    category={category}
                    key={category.get('name')}
                    navigateToPage={navigateToPage}
                />
              ))}
            </Well>
          </div>
        )}
        {// Browser or server render without data:
        //    display the loading component without Helmet
        !this.hasPageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  normalizePageData() {
    const { pageData } = this.props;
    const { features } = pageData.toJS();
    const categoryMap = {};

    let categories;
    let result;

    features.map((feature)=>{
      if (categoryMap[feature.category.id]){
        categoryMap[feature.category.id].features.push(feature)
      } else {
        categoryMap[feature.category.id] = {
          name: feature.category.name,
          id: feature.category.id,
          features: [feature]
        }
      }
    });

    categories = Object.values(categoryMap);
    return Immutable.fromJS({ categories });
  }

  fetchPageData() {
    const { fetchPageData } = this.props;

    fetchPageData(
      ROUTE_CONFIG,
      null,
      this.onFetchPageDataSuccess,
      this.onFetchPageDataError
    );
  }

  onFetchPageDataSuccess = () => {}; // tslint:disable-line:no-empty

  onFetchPageDataError = error => {
    if (this.connectionAttempts < this.connectionAttemptsAllowed) {
      setTimeout(() => {
        this.fetchPageData();
        this.connectionattempts++;
      }, 2000);
    } else {
      // notify loading complete
    }
  };

  get hasPageData() {
    const { pageData } = this.props;
    return pageData && pageData.get('pageType') === ROUTE_CONFIG.type;
  }
}

export default withRouter(FeaturesPage);

FeaturesPage.getClasses = config => {
  const styles = FeaturesPage.getStyles(config);

  return {
    container: css(styles.container),
    header: css(styles.header)
  };
};

FeaturesPage.getStyles = config =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)',
      padding: '0 40px 0 40px',
      width: '100%'
    },
    header: {
      color: config.theme.getIn(['app', 'color', 'headerText']),
      textTransform: 'uppercase'
    }
  });

FeaturesPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

FeaturesPage.defaultProps = {
  pageData: null
};

FeaturesPage.contextType = ApplicationContext;

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
