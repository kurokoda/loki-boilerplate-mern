/** @module TopicPage */

import { css, StyleSheet } from "aphrodite";
import Immutable from "immutable";
import PropTypes from "prop-types";
import qs from "qs";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";
import {
  isBrowserEnvironment,
  isServerEnvironment
} from "../../../utils/isomorphic";
import {
  getTopicCacheBustedVoteDataUrl,
  getTopicPageDataUrl,
  getVoteDataUrl
} from "../../../utils/route";
import Loading from "../../loading";
import Pagination from "../../pagination";
import Featured from "../../section/Featured";
import General from "../../section/General";
import Recent from "../../section/Recent";
import Helmet from "./helmet";

/**
 * The application result page component.
 *
 * Children:
 * * `<TopicHelmet>`
 * * `<FeaturedSection>`
 * * `<RecentSection>`
 * * `<Pagination>`
 * * `<GeneralSection>`
 *
 * @returns {xml} The ResultPage component
 */
class TopicPage extends Component {
  /**
   * Controls updates and rendering
   *
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  /**
   * Resets page position, adds onLocationChange listener, and adds onResize
   * event listener. The topic page does not initially load data because the
   * topic page component does not dismount when a topic change occurs un the
   * route. As a result, we load (and reload) data as a result of location
   * changes
   *
   * @returns {void}
   */
  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.onLocationChange);
    this.locationHasChanged = true;

    window.scrollTo(0, 0);
    /* eslint-disable no-did-mount-set-state */
    this.setState({ location: window && window.location });
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    const { pageData } = this.props;

    if(!pageData && isBrowserEnvironment){
      this.fetchPageData();
      this.locationHasChanged = false;
    } else {
      if(this.locationHasChanged){
        this.fetchCacheBustedVoteData();
        this.locationHasChanged = false;
      }
    }
  }

  componentWillUnmount() {
    const { flushPageData } = this.props;

    this.unlisten();
    window.removeEventListener("resize", this.onResize);
    flushPageData();
  }

  render() {
    const { topic } = this.props.match.params;
    const {
      pageData,
      sessionVotes,
      votes,
      votingModules,
      analyticsCategoryPostVoteSocialShareAction,
      analyticsCategoryManualVoteAction,
      analyticsCallArticleLinkAction
    } = this.props;
    let query;
    let page;
    let buttonCount;

    let filteredPageData;

    if (pageData && isBrowserEnvironment) {
      query = qs.parse(window.location.search.slice(1));
      page = Number(query.page) || 1;
      if (window.innerWidth <= 350) {
        buttonCount = 2;
      } else if (window.innerWidth <= 480) {
        buttonCount = 3;
      } else {
        buttonCount = 5;
      }
      filteredPageData = TopicPage.filterPageData(pageData);
    }

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        Boolean(pageData && isBrowserEnvironment) && (
          <div name="topicPage" className={css(styles.content)}>
            <Helmet topic={topic} />
            <Featured
              config={filteredPageData.get("featured")}
              mode="header"
              analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
            />
            <Recent
              page={page}
              config={filteredPageData.get("recent")}
              castVote={this.onCastVote}
              onAnimationComplete={this.onAnimationComplete}
              onClickAnalyticAction={this.onClickAnalyticAction}
              sessionVotes={sessionVotes}
              votingModules={votingModules}
              votes={votes}
              postVoteShareActionCategory={
                analyticsCategoryPostVoteSocialShareAction
              }
              manualVoteActionCategory={analyticsCategoryManualVoteAction}
            />
            <div className={css(styles.paginationContainer)}>
              <Pagination
                page={page}
                buttonCount={buttonCount}
                itemsTotal={filteredPageData.get("articleCount")}
                displayCount={8}
                onButtonClick={this.onPaginationButtonClick}
              />
            </div>
            <General
              config={filteredPageData.get("general")}
              analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
            />
          </div>
        )}
        {// Server render with data:
        // Use helmet to populate Helmet and display the loading component
        Boolean(pageData && isServerEnvironment) && (
          <Fragment>
            <Helmet topic={topic} />
            <Loading />;
          </Fragment>
        )}
        {// Browser or server render without data:
        //    display the loading component without Helmet
        !pageData && <Loading />}
      </Fragment>
    );
  }

  fetchPageData() {
    if (!this.isLoading) {
      this.isLoading = true;
      const topic = window.location.pathname.split("/").join("");
      const query = qs.parse(window.location.search.slice(1));
      const page = query.page || 1;
      const url = getTopicPageDataUrl(topic, page);

      const {
        fetchPageData,
        fetchPageDataSuccess,
        fetchPageDataError
      } = this.props;

      fetchPageData();

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
          this.fetchCacheBustedVoteData();
        })
        .catch(error => {
          this.isLoading = false;
          fetchPageDataError(error);
          this.onFetchPageDataError(error);
        });
    }
  }

  fetchCacheBustedVoteData() {
    if (!this.isLoading) {
      this.isLoading = true;
      const topic = window.location.pathname.split("/").join("");
      const query = qs.parse(window.location.search.slice(1));
      const page = query.page || 1;
      const url = getTopicCacheBustedVoteDataUrl(topic, page);

      const {
        fetchCacheBustedVoteData,
        fetchCacheBustedVoteDataSuccess,
        fetchCacheBustedVoteDataError
      } = this.props;

      fetchCacheBustedVoteData();

      fetch(url)
        .then(
          response =>
            response.ok
              ? Promise.resolve(response.json())
              : Promise.reject("Invalid response in fetchPageData()")
        )
        .then(payload => {
          this.isLoading = false;
          fetchCacheBustedVoteDataSuccess(payload);
          this.fetchCacheBustedVoteDataSuccess();
        })
        .catch(error => {
          this.isLoading = false;
          fetchCacheBustedVoteDataError(error);
          this.fetchCacheBustedVoteDataError(error);
        });
    }
  }

  onPaginationButtonClick = pageNumber => {
    const { topic } = this.props.match.params;
    const { history } = this.props;

    history.push(`/${topic}?page=${pageNumber}`);
    window.scrollTo(0, 0);
  };

  onAnimationComplete = slug => {
    const { votingModuleUpdated } = this.props;
    votingModuleUpdated({ slug });
  };

  onClickAnalyticAction = article => {
    const { analyticsCallArticleLinkAction } = this.props;
    analyticsCallArticleLinkAction();
  };

  onCastVote = (article, faction) => {
    const slug = article.get("slug");
    const url = getVoteDataUrl(slug);
    const { voteUpdatedLocally, voteUpdatedRemotely } = this.props;
    const hashtagId = article.getIn(["voting", faction, "id"]);
    const body = JSON.stringify({ vote: { hashtag_id: hashtagId } });

    voteUpdatedLocally({ slug, faction });

    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body
    })
      .then(
        res =>
          res.ok
            ? Promise.resolve(res.json())
            : Promise.reject("Invalid response in fetchPageData()")
      )
      .then(payload => {
        voteUpdatedRemotely(payload);
        this.onCastVoteSuccess(payload);
      })
      .catch(error => {
        this.onCastVoteError(error);
      });
  };

  onLocationChange = location => {
    const { state } = this;
    const { flushPageData } = this.props;

    if (state.location && state.location !== location) {
      flushPageData();
    }
    this.locationHasChanged = true;
    this.setState({ location });
  };

  /*
   * !!!IMPORTANT!!!
   *
   * Many of our components require layout properties or their parent's width
   * values to display properly. The onResize function forces an update which
   * will cause those components to re-render themselves appropriately.
   */

  onResize = () => {
    this.forceUpdate();
  };

  onFetchPageDataSuccess = () => {
    this.fetchCacheBustedVoteData();
  };

  onFetchPageDataError = () => {};

  fetchCacheBustedVoteDataSuccess = () => {};

  fetchCacheBustedVoteDataError = () => {};

  onCastVoteSuccess = () => {};

  onCastVoteError = () => {};
}

/**
 * Filters incoming page data, converting legacy and/or poorly named elements
 * into more intuitive naming conventions
 * @methodof ArticlePage
 * @param {object} pageData The data to be filtered
 * @returns {object} The filtered data
 */
TopicPage.filterPageData = pageData => {
  /*
   * TODO
   *
   * The server side rendering fails to convert the hydrated pageData into an
   * Immutable object, so conditionally applying toJS() to the pageData seems
   * to be necessary for now.
   *
   * Not a terrible hack, but a hack.
   */

  const input = pageData.toJS ? pageData.toJS() : pageData;
  const output = {
    articleCount: input.articlePageData.articleCount,
    featured: input.articlePageData.featuredArticles[0],
    recent: input.articlePageData.articles.slice(0, 7),
    general: input.articlePageData.recentArticles.slice(0, 8)
  };
  return Immutable.fromJS(output);
};

TopicPage.propTypes = {
  /** Dispatches analytics action on post vote social share */
  analyticsCategoryPostVoteSocialShareAction: PropTypes.func,
  /** Dispatches analytics action on manual vote */
  analyticsCategoryManualVoteAction: PropTypes.func,
  /** Dispatches analytics action on article link click */
  analyticsCallArticleLinkAction: PropTypes.func,
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Dispatches action to notify of page data request success */
  fetchPageDataSuccess: PropTypes.func.isRequired,
  /** Dispatches action to notify of page data request failure */
  fetchPageDataError: PropTypes.func.isRequired,
  /** Dispatches action to notify of cachebusted page data request */
  fetchCacheBustedVoteData: PropTypes.func.isRequired,
  /** Dispatches action to notify of cachebusted page data request failure */
  fetchCacheBustedVoteDataError: PropTypes.func.isRequired,
  /** Dispatches action to notify of cachebusted page data request success */
  fetchCacheBustedVoteDataSuccess: PropTypes.func.isRequired,
  /** Dispatches action to request page data deletion */
  flushPageData: PropTypes.func.isRequired,
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired,
  /** The application routes which correspond to react router's current location */
  match: ReactRouterPropTypes.match.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map,
  /** The user's votes that have occured within this session */
  sessionVotes: ImmutablePropTypes.map,
  /** Dispatches action to notify of vote being updated locally */
  voteUpdatedLocally: PropTypes.func.isRequired,
  /** Dispatches action to notify of vote being updated remotely */
  voteUpdatedRemotely: PropTypes.func.isRequired,
  /** The user's past voting history */
  votes: ImmutablePropTypes.map.isRequired,
  /** The the state of all potential voting modules used to determine whether to animate vote meters */
  votingModules: ImmutablePropTypes.map.isRequired,
  /** Dispatches action to notify of vote module being updated. This will disable it's animation */
  votingModuleUpdated: PropTypes.func.isRequired
};

TopicPage.defaultProps = {
  pageData: null,
  sessionVotes: null,
  analyticsCategoryPostVoteSocialShareAction: null,
  analyticsCategoryManualVoteAction: null,
  analyticsCallArticleLinkAction: null
};

export default withRouter(TopicPage);

/**
 * Dynamically generates styles
 * @methodof ArticlePage
 */
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
  paginationContainer: {
    margin: "20px 0 0 0"
  },
  spacer: {
    display: "block",
    height: "70px",
    width: "100%",
    margin: "0 auto"
  }
});

// TODO move getStyles() from render to componentDidMount
// TODO make getStyles() a static method
// TODO move immutable.js data hack into reducer
