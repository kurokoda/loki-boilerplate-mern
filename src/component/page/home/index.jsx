/** @module HomePage */

import { css, StyleSheet } from "aphrodite";
import Immutable from "immutable";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";
import { getIncrementedElementName } from "../../../utils/collection";
import {
  isBrowserEnvironment,
  isServerEnvironment
} from "../../../utils/isomorphic";
import { getHomePageDataUrl } from "../../../utils/route";
import { ROUTE as ROUTE_REGEX } from "../../../constants/regex";
import Loading from "../../loading";
import CallToAction from "../../section/CallToAction";
import Featured from "../../section/Featured";
import General from "../../section/General";
import Result from "../../section/Result";
import Topic from "../../section/Topic";
import Jumbotron from "../../tile/Jumbotron";
import Helmet from "./helmet";

/**
 * The application home page component.
 *
 * Children:
 * * `<HomeHelmet>`
 * * `<Jumbotron>`
 * * `<FeaturedSection>`
 * * `<TopicSection>`
 * * `<ResultSection>`
 * * `<GeneralSection>`
 *
 * @returns {xml} The HomePage component
 */

class HomePage extends Component {
  state = {
    layout: null
  };

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  /**
   * Fetches page data, resets page position, and adds onResize event listener
   * @returns {void}
   */
  componentDidMount() {
    const { history, pageData, analyticsClearArticleMetadata } = this.props;

    if (!pageData) {
      this.fetchPageData();
    }
    this.unlisten = history.listen(this.onLocationChange);
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.onResize);
    this.onResize();
    analyticsClearArticleMetadata();
  }

  componentDidUpdate() {
    const { pageData } = this.props;

    !pageData && isBrowserEnvironment && this.fetchPageData();
  }

  componentWillUnmount() {
    const { flushPageData } = this.props;

    this.unlisten();
    window.removeEventListener("resize", this.onResize);
    flushPageData();
  }

  render() {
    const classes = HomePage.getClasses();
    const { layout } = this.state;
    const { history, pageData, analyticsCallArticleLinkAction } = this.props;

    let filteredPageData;

    if (pageData) {
      filteredPageData = HomePage.filterPageData(pageData, layout);
    }

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        Boolean(pageData && isBrowserEnvironment) && (
          <div className={classes.container}>
            <h1 className={classes.hiddenHeader}>The Tylt</h1>
            <Helmet />
            <div id="home-page" className={classes.container}>
              <Jumbotron
                layout={layout}
                config={filteredPageData.get("jumbotron")}
                analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
              />
              <div className={classes.spacer} />
              <div className={classes.content}>
                {layout === "expanded" && (
                  <Featured
                    config={filteredPageData.get("featured")}
                    mode="group"
                    analyticsCallArticleLinkAction={
                      analyticsCallArticleLinkAction
                    }
                  />
                )}
                <div>
                  {filteredPageData
                    .getIn(["topics", "sections"])
                    .map((section, index) => {
                      const divider = this.getDividerForIndex(index);
                      return (
                        <div key={getIncrementedElementName("topicSection")}>
                          <Topic
                            config={section}
                            layout={layout}
                            analyticsCallArticleLinkAction={
                              analyticsCallArticleLinkAction
                            }
                          />
                          {divider && <CallToAction config={divider} />}
                        </div>
                      );
                    })}
                </div>
                <Result
                  config={filteredPageData.get("results")}
                  viewAll
                  analyticsCallArticleLinkAction={
                    analyticsCallArticleLinkAction
                  }
                />
                <General
                  config={filteredPageData.get("general")}
                  analyticsCallArticleLinkAction={
                    analyticsCallArticleLinkAction
                  }
                />
              </div>
            </div>
          </div>
        )}
        {// Server render with data:
        // Use helmet to populate Helmet and display the loading component
        Boolean(pageData && isServerEnvironment) && (
          <Fragment>
            <h1 className={classes.hiddenHeader}>The Tylt</h1>
            <Helmet
              pageData={filteredPageData}
              path={history.location.pathname}
            />
            <Loading />;
          </Fragment>
        )}
        {// Browser or server render without data:
        //    display the loading component without Helmet
        !pageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  fetchPageData() {
    if (!this.isLoading) {
      this.isLoading = true;
      const url = getHomePageDataUrl();
      const {
        fetchPageData,
        fetchPageDataSuccess,
        fetchPageDataError
      } = this.props;
      const pathname = window.location.pathname;
      const isHomeRoute = ROUTE_REGEX.HOME_PAGE.test(pathname);

      fetchPageData();

      if (isHomeRoute) {
        fetch(url)
          .then(
            response =>
              response.ok
                ? Promise.resolve(response.json())
                : Promise.reject("Invalid response in fetchPageData()")
          )
          .then(payload => {
            this.isLoading = false;
            fetchPageDataSuccess(payload);
            this.onFetchPageDataSuccess();
          })
          .catch(error => {
            this.isLoading = false;
            fetchPageDataError(error);
            this.onFetchPageDataError(error);
          });
      }
    }
  }

  getDividerForIndex(index) {
    const dividers = this.getCallToActionDividers();
    return dividers.find(divider => divider.get("index") === index);
  }

  getCallToActionDividers() {
    const { layout } = this.state;
    return Immutable.fromJS([
      {
        index: 1,
        callsToAction:
          layout === "expanded"
            ? [{ action: "twitter-follow" }, { action: "facebook-follow" }]
            : [{ action: "twitter-follow" }]
      },
      {
        index: 3,
        callsToAction:
          layout === "expanded"
            ? [{ action: "instagram-follow" }, { action: "email" }]
            : [{ action: "instagram-follow" }]
      }
    ]);
  }

  onLocationChange = location => {
    const { flushPageData } = this.props;

    flushPageData();
  };

  onResize = () => {
    const layout = window.innerWidth > 768 ? "expanded" : "collapsed";
    this.setState({ layout });
  };

  onFetchPageDataSuccess = () => {};

  onFetchPageDataError = error => {};

  onFetchVoteDataSuccess = () => {};
}

HomePage.getClasses = () => {
  const styles = HomePage.getStyles();

  return {
    container: css(styles.container),
    content: css(styles.content),
    hiddenHeader: css(styles.hiddenHeader),
    spacer: css(styles.spacer)
  };
};

/**
 * Filters incoming page data, converting legacy and/or poorly named elements
 * into more intuitive naming conventions.
 * @methodof HomePage
 * @param {object} pageData The data to be filtered
 * @param {string} layout The current layout of the page, either 'expanded' or
 * 'collapsed, based on page width
 * @returns {object} The filtered data
 */
HomePage.filterPageData = (pageData, layout) => {
  /*
   * TODO
   *
   * For some reason, the server side rendering fails to convert
   * the hydrated pageData into an Immutable object, so conditionally
   * applying toJS() to the pageData seems to be necessary for now.
   *
   * Not a terrible hack, but a hack.
   */

  const input = pageData.toJS ? pageData.toJS() : pageData;
  const output = {
    jumbotron: input.articlePageData.featuredArticles[0],
    featured: input.articlePageData.featuredArticles.slice(1),
    topics: input.articlePageData.topicSections,
    results:
      layout === "expanded"
        ? input.articlePageData.resultsSection
        : input.articlePageData.resultsSection.slice(0, 1),
    general: input.articlePageData.articles.slice(0, 8)
  };
  return Immutable.fromJS(output);
};

HomePage.propTypes = {
  /** Dispatches analytics action on article click */
  analyticsCallArticleLinkAction: PropTypes.func.isRequired,
  /** Dispatches analytics action on deletion of article metadata */
  analyticsClearArticleMetadata: PropTypes.func.isRequired,
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Dispatches action to notify of page data request success */
  fetchPageDataSuccess: PropTypes.func.isRequired,
  /** Dispatches action to notify of page data request failure */
  fetchPageDataError: PropTypes.func.isRequired,
  /** Dispatches action to request page data deletion */
  flushPageData: PropTypes.func.isRequired,
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

HomePage.defaultProps = {
  pageData: null
};

/**
 * Dynamically generates styles
 * @methodof HomePage
 * @returns {object} The class's styles
 */
HomePage.getStyles = () =>
  StyleSheet.create({
    container: {},
    homeView: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden"
    },

    content: {
      margin: "auto",
      maxWidth: "1240px",

      "@media (max-width: 768px)": {
        margin: "0 40px"
      },

      "@media (max-width: 1300px)": {
        margin: "0 20px"
      }
    },
    hiddenHeader: {
      position: "absolute",
      visibility: "hidden"
    },
    spacer: {
      display: "block",
      height: "100px",
      width: "100%",
      margin: "0 auto",

      "@media (max-width: 768px)": {
        height: "40px"
      }
    }
  });

export default withRouter(HomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
