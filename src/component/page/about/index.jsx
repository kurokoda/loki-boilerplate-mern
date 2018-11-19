/** @module AboutPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { ABOUT as ROUTE_CONFIG } from '../../../utils/route/config';
import Loading from '../../loading';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class AboutPage extends Component {
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
    const classes = AboutPage.getClasses();
    const { localization } = this.props;
    const title = localization.getIn(['about', 'title']).toUpperCase();

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
              <p className={classes.text}>
                My goal was to move beyond the repetitive coding and
                copy-pasting involved in getting a full-fledged isomorphic web
                application running, in order to allow me to focus on the
                application-specific features. In other words, I wanted to get
                to the fun stuff as quickly as possible.
              </p>
              <br />
              <h5 className={classes.header}>Opiniated style rules</h5>
              <br />
              <p className={classes.text}>
                I chose to build this application base with simplicity in mind,
                and with a highly opiniated development philosophy. Strict type
                checking, linting, code formatting, along with simple and
                consitent naming concepts and flat directory structures aim for
                an application which is eash to navigate, and to develop.
              </p>
              <br />
              <h5 className={classes.header}>
                Start with everything, build with what you need.
              </h5>
              <br />
              <p className={classes.text}>
                Based on my own experience, most production web applications
                have a larger minimum feature set than developers account for,
                and nice-to-have features added further down the road tend to
                suffer for having not been planned for from the beginning.
                Analytics, localization, and dynamic themes are all examples of
                this. I built this app with that idea in mind. While those
                features may or may not be implemented, the design philosophies
                of separation of concerns and the benefits of having centralized
                data sources are universal.
              </p>
              <br />
              <h5 className={classes.header}>
                Every effort should leverage opportunity for maximum benefit
              </h5>
              <br />
              <p className={classes.text}>
                Like all developers, at the end of the day, I wanted to build a
                good tool. Not just a demo, but something that I could use in
                the future, to build other tools. And I wanted that tool to
                benefit as many people as possible; I hope that in the long run,
                this tool will benefit not only my own projects, but other
                developers as well.
              </p>
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

  onFetchPageDataError = error => {}; // tslint:disable-line:no-empty

  get hasPageData() {
    const { pageData } = this.props;
    return pageData && pageData.get('pageType') === ROUTE_CONFIG.type;
  }
}

AboutPage.getClasses = () => {
  const styles = AboutPage.getStyles();

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

AboutPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Localization text */
  localization: ImmutablePropTypes.map.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

AboutPage.defaultProps = {
  pageData: null
};

/**
 * Dynamically generates styles
 * @methodof AboutPage
 * @returns {object} The class's styles
 */
AboutPage.getStyles = () =>
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

export default withRouter(AboutPage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
