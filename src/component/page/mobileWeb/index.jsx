/** @module MobileWebPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { localize } from '../../../utils/strings/index';
import Well from '../../well';
import Helmet from './helmet';
import { ApplicationContext } from '../../../context/application';

class MobileWebPage extends Component {
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
    const { pageData } = this.props;

    !pageData && this.fetchPageData();
    window.scrollTo(0, 0);
  }

  fetchPageData() {
    const { fetchPageData } = this.props;
    fetchPageData(
      'home',
      this.onFetchPageDataSuccess,
      this.onFetchPageDataError
    );
  }

  onFetchPageDataSuccess = () => {
    console.log('success!');
  };

  onFetchPageDataError = error => {
    console.log('error!');
  };

  render() {
    const strings = this.context.strings;
    const theme = this.context.theme;
    const classes = MobileWebPage.getClasses({ theme });
    const paragraphOne = localize(strings, ['about', 'paragraphOne']);
    const paragraphTwo = localize(strings, ['about', 'paragraphTwo']);
    const paragraphThree = localize(strings, ['about', 'paragraphThree']);
    const paragraphFour = localize(strings, ['about', 'paragraphFour']);

    return (
      <Fragment>
        <div id="MobileWeb-page" className={classes.container}>
          <Helmet />
          <Well>
            <h3 className={classes.header}>Mobile Web</h3>
            <br />
            <h5 className={classes.header}>
              An exciting attempt to allow our application to display both web
              and mobile
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
      </Fragment>
    );
  }
}

MobileWebPage.getClasses = config => {
  const styles = MobileWebPage.getStyles(config);

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof MobileWebPage
 * @returns {object} The class's styles
 */
MobileWebPage.getStyles = config =>
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

MobileWebPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

MobileWebPage.defaultProps = {
  pageData: null
};

export default withRouter(MobileWebPage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
