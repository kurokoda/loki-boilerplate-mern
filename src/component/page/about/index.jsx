/** @module AboutPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { ABOUT as ROUTE_CONFIG } from '../../../utils/route/config';
import { localize } from '../../../utils/strings';
import Loading from '../../loading';
import Well from '../../well';
import Helmet from './helmet';
import { ApplicationContext } from '../../../context/application';

class AboutPage extends Component {
  static contextType = ApplicationContext;

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
    const classes = AboutPage.getClasses({ theme });
    const title = localize(strings, ['about', 'title']).toUpperCase();
    const paragraphOne = localize(strings, ['about', 'paragraphOne']);
    const paragraphTwo = localize(strings, ['about', 'paragraphTwo']);
    const paragraphThree = localize(strings, ['about', 'paragraphThree']);
    const paragraphFour = localize(strings, ['about', 'paragraphFour']);

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="about-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{title}</h3>
              <br />
              <h5 className={classes.header}>
                A scalable, standardized boilerplate for rapid application
                development
              </h5>
              <br />
              <p className={classes.text}>{paragraphOne}</p>
              <br />
              <h5 className={classes.header}>Opinionated style rules</h5>
              <br />
              <p className={classes.text}>{paragraphTwo}</p>
              <br />
              <h5 className={classes.header}>
                Start with everything, build with what you need.
              </h5>
              <br />
              <p className={classes.text}>{paragraphThree}</p>
              <br />
              <h5 className={classes.header}>
                Every effort should leverage opportunity for maximum benefit
              </h5>
              <br />
              <p className={classes.text}>{paragraphFour}</p>
              <br />
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

  fetchPageData() {
    const { fetchPageData } = this.props;

    fetchPageData(
      ROUTE_CONFIG.type,
      this.onFetchPageDataSuccess,
      this.onFetchPageDataError
    );
  }

  onFetchPageDataSuccess = () => {}; // tslint:disable-line:no-empty

  onFetchPageDataError = error => {
    if (this.connectionAttempts < this.connectionAttemptsAllowed){
      setTimeout(()=>{
        this.fetchPageData()
        this.connectionattempts++;
      }, 2000)
    } else {
      // notify loading complete
    }
  };

  get hasPageData() {
    const { pageData } = this.props;
    return pageData && pageData.get('pageType') === ROUTE_CONFIG.type;
  }
}

AboutPage.getClasses = config => {
  const styles = AboutPage.getStyles(config);

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof AboutPage
 * @returns {object} The class's styles
 */
AboutPage.getStyles = config =>
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

AboutPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

AboutPage.defaultProps = {
  pageData: null
};

export default withRouter(AboutPage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
