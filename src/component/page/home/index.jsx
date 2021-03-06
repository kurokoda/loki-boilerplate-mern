/** @module HomePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { localize } from '../../../utils/strings';
import { HOME as ROUTE_CONFIG } from '../../../utils/route';
import Divider from '../../divider';
import Well from '../../well';
import Helmet from './helmet';
import { ApplicationContext } from '../../../context/application';

class HomePage extends Component {

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
    const { log } = this.props;
    log({ type: 'HOME_PAGE_LOAD' });
    window.scrollTo(0, 0);
  }

  render() {
    const strings = this.context.strings;
    const theme = this.context.theme;
    const classes = HomePage.getClasses({ theme });
    const title = localize(strings, ['home', 'title']).toUpperCase();
    const subtitle = localize(strings, ['home', 'subtitle']).toUpperCase();
    const paragraphOne = localize(strings, ['home', 'paragraphOne']);
    const paragraphTwo = localize(strings, ['home', 'paragraphTwo']);
    const paragraphThree = localize(strings, ['home', 'paragraphThree']);
    const paragraphFour = localize(strings, ['home', 'paragraphFour']);

    return (
      <Fragment>
          <div id="home-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{title}</h3>
              <br/>
              <h5 className={classes.header}>{subtitle}</h5>
              <br/>
              <p className={classes.text}>{paragraphOne}</p>
              <Divider />
              <p className={classes.text}>{paragraphTwo}</p>
              <br />
              <p className={classes.text}>{paragraphThree}</p>
              <br />
              <p className={classes.text}>{paragraphFour}</p>
              <br />
            </Well>
          </div>
      </Fragment>
    );
  }

  // Business logic

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
      this.connectionattempts = this.connectionattempts + 1;
      console.log(this.connectionAttempts, this.connectionAttemptsAllowed);
      setTimeout(() => {
        this.fetchPageData();
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

export default withRouter(HomePage);

HomePage.getClasses = config => {
  const styles = HomePage.getStyles(config);

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
HomePage.getStyles = config =>
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

HomePage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  // TODO
  pageData: ImmutablePropTypes.map
};

HomePage.defaultProps = {
  pageData: null
};

HomePage.contextType = ApplicationContext;

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
