/** @module ArticlePage */

import { css, StyleSheet } from "aphrodite";
import Immutable from "immutable";
import PropTypes from "prop-types";
import React, { Fragment, Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";
import { ROUTE as ROUTE_REGEX } from "../../../constants/regex";
import {
  isBrowserEnvironment,
  isServerEnvironment
} from "../../../utils/isomorphic";
import {
  getArticleCachebustedDatavizDataUrl,
  getArticleCachebustedVoteDataUrl,
  getArticlePageDataUrl,
  getVoteDataUrl
} from "../../../utils/route";
import Loading from "../../loading";
import General from "../../section/General";
import VotingModule from "../../votingModule";
import DataVisualizer from "./dataVisualizer";
import Helmet from "./helmet";
import SupportingMedia from "./supportingMedia";
import ArticleSynopsis from "./synopsis";

/**
 * The application article page component.
 *
 * Children:
 * * `<ArticleHelmet>`
 * * `<VotingModule>`
 * * `<ArticleSynopsis>`
 * * `<DataVisualizer>`
 * * `<SupportingMedia>`
 * * `<GeneralSection>`
 *
 * @returns {xml} The ArticlePage component
 */

class ArticlePage extends Component {
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
    const { pageData, history } = this.props;

    if (!pageData) {
      this.fetchPageData();
    } else {
      this.fetchCachebustedVoteData();
      this.fetchCachebustedDataVizData();
    }
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.onResize);
    history.listen(this.onLocationChange);
    this.onResize();
  }

  componentDidUpdate() {
    const { pageData } = this.props;

    !pageData && isBrowserEnvironment && this.fetchPageData();
  }

  /**
   * Flushes page data, and removes onResize event listener
   * @returns {void}
   */
  componentWillUnmount() {
    const { flushPageData } = this.props;

    flushPageData();
    window.removeEventListener("resize", this.onResize);
  }

  /**
   * Renders JSX, filters page data, and displays appropriate view components
   * based on application state
   * @returns {xml} The appropriate JSX elements based on page state
   */
  render() {
    const classes = ArticlePage.getClasses();
    const {
      history,
      pageData,
      sessionVotes,
      votes,
      analyticsCallArticleLinkAction
    } = this.props;

    let filteredPageData;
    let article;
    let vote;
    let title;

    if (pageData) {
      filteredPageData = ArticlePage.filterPageData(pageData);
      article = filteredPageData.get("article");
      title = article.get("title");
      vote = {
        slug: article.get("slug"),
        yin: article.getIn(["voting", "yin", "score"]),
        yang: article.getIn(["voting", "yang", "score"])
      };
    }
    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        Boolean(pageData && isBrowserEnvironment) && (
          <div className={classes.container}>
            <h1 className={classes.hiddenHeader}>{title} | The Tylt</h1>
            <Helmet
              pageData={filteredPageData}
              path={history.location.pathname}
            />
            <div className={classes.content}>
              <VotingModule
                layout="primary"
                castVote={this.onCastVote}
                article={article}
                sessionVotes={sessionVotes}
                vote={vote}
                votes={votes}
                socialShareAction={this.props.analyticsGenericSocialShareAction}
                postVoteShareActionArticle={
                  this.props.analyticsArticlePostVoteSocialShareAction
                }
                manualVoteActionArticle={
                  this.props.analyticsArticleManualVoteAction
                }
              />
              <ArticleSynopsis articleSynopsis={article.get("synopsis")} />
              <DataVisualizer article={article} />
              <SupportingMedia article={article} />
            </div>
            <div className={classes.moreArticles}>
              <General
                config={article.get("moreArticles")}
                analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
              />
            </div>
          </div>
        )}
        {// Server render with data:
        // Use helmet to populate Helmet and display the loading component
        Boolean(pageData && isServerEnvironment) && (
          <Fragment>
            <h1 className={classes.hiddenHeader}>{title} | The Tylt</h1>
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

  /**
   * Fetches page data from remote API
   * @returns {void}
   */
  fetchPageData() {
    const { history } = this.props;

    if (!this.isLoading) {
      this.isLoading = true;
      const slug = history.location.pathname.split("/")[2];
      const url = getArticlePageDataUrl(slug);
      const pathname = window.location.pathname;
      const isArticleRoute = ROUTE_REGEX.ARTICLE_PAGE.test(pathname);
      const {
        fetchPageData,
        fetchPageDataSuccess,
        fetchPageDataError
      } = this.props;

      fetchPageData();

      if (isArticleRoute) {
        fetch(url)
          .then(
            res =>
              res.ok
                ? Promise.resolve(res.json())
                : Promise.reject("Invalid response in fetchPageData()")
          )
          .then(payload => {
            this.isLoading = false;
            fetchPageDataSuccess(payload);
            this.onFetchPageDataSuccess(payload.articlePageData.article);
          })
          .catch(error => {
            this.isLoading = false;
            fetchPageDataError(error);
            console.log("error: ", error);
            this.onFetchPageDataError(error);
          });
      }
    }
  }

  fetchCachebustedVoteData() {
    const { history } = this.props;
    const slug = history.location.pathname.split("/")[2];
    const url = getArticleCachebustedVoteDataUrl(slug);

    const {
      fetchCachebustedVoteData,
      fetchCachebustedVoteDataSuccess,
      fetchCachebustedVoteDataError
    } = this.props;

    fetchCachebustedVoteData();

    fetch(url)
      .then(
        response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject("Invalid response in fetchCachebustedVoteData()")
      )
      .then(payload => {
        fetchCachebustedVoteDataSuccess(payload);
      })
      .catch(error => {
        fetchCachebustedVoteDataError(error);
      });
  }

  fetchCachebustedDataVizData() {
    const { history } = this.props;
    const slug = history.location.pathname.split("/")[2];
    const url = getArticleCachebustedDatavizDataUrl(slug);

    const {
      fetchCachebustedDatavizData,
      fetchCachebustedDatavizDataSuccess,
      fetchCachebustedDatavizDataError
    } = this.props;

    fetchCachebustedDatavizData();

    fetch(url)
      .then(
        response =>
          response.ok
            ? Promise.resolve(response.json())
            : Promise.reject(
                "Invalid response in fetchCachebustedDatavizData()"
              )
      )
      .then(payload => {
        fetchCachebustedDatavizDataSuccess(payload);
      })
      .catch(error => {
        fetchCachebustedDatavizDataError(error);
      });
  }

  /**
   * Calls remote api when path changes and scroll restoration
   * @returns {void}
   */
  onLocationChange = () => {
    const { flushPageData } = this.props;

    flushPageData();
    this.fetchPageData();
    window.scrollTo(0, 0);
  };

  /**
   * Callback triggered when the page resizes
   * @returns {void}
   */
  onResize = () => {
    const layout = window.innerWidth > 700 ? "expanded" : "collapsed";
    this.setState({ layout });
  };

  /**
   * Callback triggered when the page data fetch is successful
   * @param {object} article The page data
   * @returns {void}
   */
  onFetchPageDataSuccess = article => {
    const {
      analyticsOptinmonsterAction,
      analyticsUploadArticleMetadata
    } = this.props;
    window.iframely.load();
    this.fetchCachebustedVoteData();
    this.fetchCachebustedDataVizData();
    analyticsOptinmonsterAction();
    analyticsUploadArticleMetadata(article);
  };

  /**
   * Callback triggered when the page data fetch is unsuccessful
   * @param {string} error The api error
   * @returns {void}
   */
  onFetchPageDataError = error => {};

  /**
   * Callback triggered when the remote vote update is successful
   * @param {object} payload The page data
   * @returns {void}
   */
  onCastVoteSuccess = payload => {};

  /**
   * Callback triggered when the remote vote update is unsuccessful
   * @param {string} error The api error
   * @returns {void}
   */
  onCastVoteError = error => {};

  /**
   * The callback passed into he voting module. Called when a vote is cast
   * @param {object} article The article which was voted on
   * @param {string} faction The faction which was voted for
   * @returns {void}
   */
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
}

ArticlePage.getClasses = () => {
  const styles = ArticlePage.getStyles();

  return {
    container: css(styles.container),
    content: css(styles.content),
    hiddenHeader: css(styles.hiddenHeader),
    moreArticles: css(styles.moreArticles),
    votingModule: css(styles.votingModule)
  };
};

/**
 * Filters incoming page data, converting legacy and/or poorly named elements
 * into more intuitive naming conventions
 * @methodof ArticlePage
 * @param {object} pageData The data to be filtered
 * @returns {object} The filtered data
 */
ArticlePage.filterPageData = pageData => {
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
  const output = input.articlePageData;
  return Immutable.fromJS(output);
};

ArticlePage.propTypes = {
  /** Dispatches analytics action on manual vote */
  analyticsArticleManualVoteAction: PropTypes.func.isRequired,
  /** Dispatches analytics action on post-vote social share */
  analyticsArticlePostVoteSocialShareAction: PropTypes.func.isRequired,
  /** Dispatches analytics action on post-vote social share */
  analyticsGenericSocialShareAction: PropTypes.func.isRequired,
  /** Dispatches analytics action on email signup */
  analyticsOptinmonsterAction: PropTypes.func.isRequired,
  /** Dispatches analytics action on upload of article metadata */
  analyticsUploadArticleMetadata: PropTypes.func.isRequired,
  /** Dispatches analytics action on article link click */
  analyticsCallArticleLinkAction: PropTypes.func.isRequired,
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
  /** Dispatches action to notify of vote being updated locally */
  voteUpdatedLocally: PropTypes.func.isRequired,
  /** Dispatches action to notify of vote being updated remotely */
  voteUpdatedRemotely: PropTypes.func.isRequired,
  /** The user's past voting history */
  votes: ImmutablePropTypes.map.isRequired
};

ArticlePage.defaultProps = {
  pageData: null
};

/**
 * Dynamically generates styles
 * @methodof ArticlePage
 * @returns {object} The class's styles
 */
ArticlePage.getStyles = () =>
  StyleSheet.create({
    container: {
      width: "100%"
    },
    content: {
      margin: "30px auto auto auto",
      maxWidth: "512px",

      "@media (max-width: 768px)": {
        margin: "auto",
        maxWidth: "470px"
      },

      "@media (max-width: 490px)": {
        margin: "20px 10px auto 10px",
        maxWidth: "470px"
      }
    },
    hiddenHeader: {
      position: "absolute",
      visibility: "hidden"
    },
    votingModule: {
      margin: "60px auto 40px auto"
    },
    moreArticles: {
      margin: "auto",
      maxWidth: "1240px",
      width: "100%"
    }
  });

export default withRouter(ArticlePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
