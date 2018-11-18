// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { ROUTE as ROUTE_REGEX } from "../../../constants/regex";

class Social extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const classes = Social.getClasses();
    const { article, votes } = this.props;
    const vote = votes.get(article.get("slug"));

    const announcement = vote ? "EXCELLENT - YOU VOTED!" : "VOTES ARE IN!";
    const callToAction =
      window.innerWidth < 420
        ? "Start your own conversation"
        : "Double your vote by sharing";

    return (
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <div className={classes.announcement}>{announcement}</div>
          <div className={classes.callToAction}>{callToAction}</div>
        </div>
        <div className={classes.buttonContainer}>
          <div
            onClick={() => this.onShareClick(article, "twitter")}
            className={classes.buttonTwitter}
            role="button"
            tabIndex={0}
          >
            <i className={`fab fa-twitter ${classes.icon}`} />
          </div>
          <div
            onClick={() => this.onShareClick(article, "facebook")}
            className={classes.buttonFacebook}
            role="button"
            tabIndex={0}
          >
            <i className={`fab fa-facebook-f ${classes.icon}`} />
          </div>
        </div>
      </div>
    );
  }

  onShareClick = (article, platform) => {
    const {
      socialShareAction,
      postVoteShareActionArticle,
      postVoteShareActionCategory
    } = this.props;

    const url = this.getUrl(platform);
    const pathname = window.location.pathname;
    const isTopicRoute = ROUTE_REGEX.TOPIC_PAGE.test(pathname);
    const isArticleRoute = ROUTE_REGEX.ARTICLE_PAGE.test(pathname);

    Social.openWindow(url);

    if (isArticleRoute && postVoteShareActionArticle) {
      socialShareAction();
      postVoteShareActionArticle(article, platform);
    } else if (isTopicRoute && postVoteShareActionCategory) {
      postVoteShareActionCategory(article, platform);
    }
  };

  getUrl(type) {
    const { article, votes } = this.props;
    const title = article.get("title");
    const vote = votes.get(article.get("slug"));
    const hashtag = vote ? article.getIn(["voting", vote, "hashtag"]) : "";
    const postVoteShare =
      type === "twitter"
        ? article.getIn(["shortLinks", "twitter_post_vote_share"])
        : article.getIn(["shortLinks", "facebook_post_vote_share"]);

    const twitterText = `I just voted for ${hashtag.replace(
      "#",
      "%23"
    )} on @thetylt. Share this and Tylt the conversation, ${postVoteShare}, or RT◢`;

    const url =
      type === "twitter"
        ? `https://twitter.com/intent/tweet?text=${twitterText}&hashtags=${hashtag.replace(
            "#",
            ""
          )}`
        : `https://www.facebook.com/sharer/sharer.php?u=${postVoteShare}&quote=${title}&hashtag=${hashtag.replace(
            "#",
            "%23"
          )}`;
    return url;
  }
}

// Type validation

Social.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  votes: PropTypes.shape({}).isRequired,
  socialShareAction: PropTypes.func,
  postVoteShareActionArticle: PropTypes.func,
  postVoteShareActionCategory: PropTypes.func
};

Social.defaultProps = {
  socialShareAction: null,
  postVoteShareActionArticle: null,
  postVoteShareActionCategory: null
};

// Static

Social.openWindow = url => {
  const width = 550;
  const height = 400;
  const left =
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2;
  const top =
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2;

  const config = {
    height,
    width,
    left,
    top,
    location: "no",
    toolbar: "no",
    status: "no",
    directories: "no",
    menubar: "no",
    scrollbars: "yes",
    resizable: "no",
    centerscreen: "yes",
    chrome: "yes"
  };

  const specs = Object.keys(config)
    .map(key => `${key}=${config[key]}`)
    .join(", ");

  window.open(url, "newwindow", specs);
};

Social.getClasses = () => {
  const styles = Social.getStyles();

  return {
    announcement: css(styles.announcement),
    container: css(styles.container),
    callToAction: css(styles.callToAction),
    button: css(styles.button),
    buttonContainer: css(styles.buttonContainer),
    buttonFacebook: css([styles.button, styles.buttonFacebook]),
    buttonTwitter: css([styles.button, styles.buttonTwitter]),
    icon: css(styles.icon),
    textContainer: css(styles.textContainer),
    yin: css(styles.yin),
    yang: css(styles.yang)
  };
};

Social.getStyles = config =>
  StyleSheet.create({
    announcement: {
      color: "#000000",
      fontFamily: "Avenir Next Bold",
      fontSize: "16px",
      margin: "4px 0 0 0",

      "@media (max-width: 500px)": {
        margin: "6px 0 0 0",
        fontSize: "12px"
      }
    },
    callToAction: {
      fontFamily: "Avenir Next",
      fontSize: "12px",

      "@media (max-width: 500px)": {
        fontWeight: "bold",
        fontSize: "10px"
      }
    },
    button: {
      borderRadius: "20px",
      color: "white",
      cursor: "pointer",
      display: "inline-block",
      fontFamily: "Open Sans",
      fontSize: "20px",
      height: "40px",
      margin: "8px 10px 0 0",
      userSelect: "none",
      width: "40px"
    },
    buttonContainer: {
      position: "absolute",
      right: "0"
    },
    buttonFacebook: {
      backgroundColor: "#37589d"
    },
    buttonTwitter: {
      backgroundColor: "#38acf4"
    },
    container: {
      boxSizing: "border-box",
      position: "relative",
      backgroundColor: "#ffffff",
      border: "solid 1px #acacac",
      height: "56px",
      width: "100%",
      margin: "10px 0 0 0",
      overflow: "hidden"
    },
    icon: {
      color: "white",
      fontSize: "20px",
      padding: "10px 0 0 0",
      textAlign: "center",
      width: "100%"
    },
    textContainer: {
      margin: "7px 0 0 10px",
      position: "absolute"
    },
    yin: {
      color: "#f33182"
    },
    yang: {
      color: "#4cd8ce"
    }
  });

// Exports

export default Social;
