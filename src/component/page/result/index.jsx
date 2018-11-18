/** @module ResultPage */

import { css, StyleSheet } from "aphrodite";
import Immutable from "immutable";
import PropTypes from "prop-types";
import qs from "qs";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import ReactRouterPropTypes from "react-router-prop-types";
import {
  isBrowserEnvironment,
  isServerEnvironment
} from "../../../utils/isomorphic";
import { getResultPageDataUrl } from "../../../utils/route";
import Loading from "../../loading";
import Pagination from "../../pagination";
import General from "../../section/General";
import Result from "../../section/Result";
import Helmet from "./helmet";

/**
 * The application result page component.
 *
 * Children:
 * * `<ResultHelmet>`
 * * `<ResultSection>`
 * * `<Pagination>`
 * * `<GeneralSection>`
 *
 * @returns {xml} The ResultPage component
 */

class ResultPage extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  componentDidMount() {
    const { pageData, history } = this.props;
    const query = qs.parse(history.location.search.slice(1));

    this.page = Number(query.page) || 1;
    !pageData && this.fetchPageData();
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    const { pageData } = this.props;
    !pageData && this.fetchPageData();
  }

  componentWillUnmount() {
    const { flushPageData } = this.props;
    flushPageData();
  }

  render() {
    const {
      analyticsCallArticleLinkAction,
      flushPageData,
      pageData,
      history
    } = this.props;
    const query = qs.parse(history.location.search.slice(1));
    const page = Number(query.page) || 1;

    if (this.page !== page) {
      this.page = page;
      flushPageData();
    }

    let filteredPageData;
    let buttonCount;

    if (pageData && isBrowserEnvironment) {
      if (window.innerWidth <= 350) {
        buttonCount = 2;
      } else if (window.innerWidth <= 480) {
        buttonCount = 3;
      } else {
        buttonCount = 5;
      }
      filteredPageData = ResultPage.filterPageData(pageData);
    }

    return (
      <Fragment>
        {// Browser render with data:
        pageData && isBrowserEnvironment && (
          <div name="resultPage" className={css(styles.content)}>
            <Helmet />
            <Result
              config={filteredPageData.get("recent")}
              analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
            />
            <Pagination
              page={page}
              buttonCount={buttonCount}
              itemsTotal={filteredPageData.get("articleCount")}
              displayCount={8}
              onButtonClick={this.onPaginationButtonClick}
            />
            <General
              config={filteredPageData.get("general")}
              analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
            />
          </div>
        )}
        {// Server render with data:
        pageData && isServerEnvironment && (
          <Fragment>
            <Helmet />
            <Loading />;
          </Fragment>
        )}
        {// Browser or server render without data:
        !pageData && <Loading />}
      </Fragment>
    );
  }

  fetchPageData() {
    const { history } = this.props;

    if (!this.isLoading) {
      this.isLoading = true;
      const query = qs.parse(history.location.search.slice(1));
      const page = query.page || 1;
      const url = getResultPageDataUrl(page);
      const {
        fetchPageData,
        fetchPageDataSuccess,
        fetchPageDataError
      } = this.props;

      fetchPageData();

      fetch(url)
        .then(response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject("Invalid response in fetchPageData()")
        )
        .then(payload => {
          this.isLoading = false;
          fetchPageDataSuccess(payload);
          this.onFetchPageDataSuccess(payload);
        })
        .catch(error => {
          this.isLoading = false;
          fetchPageDataError(error);
          this.onFetchPageDataError(error);
        });
    }
  }

  onPaginationButtonClick = pageNumber => {
    const { history } = this.props;
    history.push(`/results?page=${pageNumber}`);
    window.scrollTo(0, 0);
  };

  onFetchPageDataSuccess = payload => {};

  onFetchPageDataError = error => {};

  onResize = () => {
    this.forceUpdate();
  };
}

/**
 * Filters incoming page data, converting legacy and/or poorly named elements
 * into more intuitive naming conventions
 * @param {object} pageData The page data
 * @methodof ResultPage
 * @returns {object} The filtered page data
 */
ResultPage.filterPageData = pageData => {
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
    articleCount: input.articlePageData.articleCount,
    recent: input.articlePageData.articles.slice(0, 8),
    general: input.articlePageData.moreArticles.slice(0, 8)
  };
  return Immutable.fromJS(output);
};

ResultPage.propTypes = {
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
  pageData: ImmutablePropTypes.map,
  /** Dispatches action when article is clicked */
  analyticsCallArticleLinkAction: PropTypes.func
};

ResultPage.defaultProps = {
  pageData: null,
  analyticsCallArticleLinkAction: null
};

export default ResultPage;

const styles = StyleSheet.create({
  content: {
    margin: "54px auto auto auto",
    maxWidth: "1240px",

    "@media (max-width: 1300px)": {
      margin: "54px 20px auto 20px"
    },

    "@media (max-width: 768px)": {
      margin: "40px 20px auto 20px"
    }
  },

  spacer: {
    display: "block",
    height: "70px",
    width: "100%",
    margin: "0 auto"
  }
});

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
