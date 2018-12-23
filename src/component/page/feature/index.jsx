/** @module FeaturePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router';
import { localize } from '../../../utils/strings';
import { FEATURE as ROUTE_CONFIG } from '../../../utils/route';
import Well from '../../well';
import Loading from '../../loading';
import Helmet from './helmet';
import { ApplicationContext } from '../../../context/application';

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
    const { pageData } = this.props;
    const strings = this.context.strings;
    const theme = this.context.theme;
    const title = localize(strings, ['feature', 'title']).toUpperCase();
    const classes = FeaturePage.getClasses({ theme });

    let name;
    let description;
    let descriptionDetail;

    if(pageData){
      name = pageData.getIn(['feature', 'name']);
      description = pageData.getIn(['feature', 'description']);
      descriptionDetail = pageData.getIn(['feature', 'descriptionDetail']);
    }


    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="feature-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{name}</h3>
              <br/>
              <h5 className={classes.header}>{description}</h5>
              <br/>
              <p className={classes.text}>{descriptionDetail}</p>
            </Well>
            {}
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
    const { fetchPageData, match } = this.props;
    const { id } = match.params;

    fetchPageData(
      ROUTE_CONFIG,
      { id },
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

export default withRouter(FeaturePage);

FeaturePage.getClasses = (config) => {
  const styles = FeaturePage.getStyles(config);

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof FeaturePage
 * @returns {object} The class's styles
 */
FeaturePage.getStyles = (config) =>
    StyleSheet.create({
      container: {
        minHeight: 'calc(100vh-100px)',
        padding: '0 40px 0 40px',
        width: '100%'
      },
      header: {
        color: config.theme.getIn(['app', 'color', 'headerText']),
        textTransform: 'uppercase'
      },
      text: {
        color: config.theme.getIn(['app', 'color', 'text']),
        fontSize: config.theme.getIn(['app', 'fontSize', 'primary'])
      }
    });

FeaturePage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** The application's routing history */
  history: ReactRouterPropTypes.history.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

FeaturePage.defaultProps = {
  pageData: null
};

FeaturePage.contextType = ApplicationContext;

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
