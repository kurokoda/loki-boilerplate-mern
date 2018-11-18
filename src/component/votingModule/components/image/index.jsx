// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Link } from "react-router-dom";
import { isArticleActive, isVoteInSession } from "../../utils/article";

class Image extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { isActive } = this;
    const { article, orientation, onClickAnalyticAction } = this.props;
    const classes = Image.getClasses({
      isVoteInSession: this.isVoteInSession,
      doShowAffiliateLink: this.doShowAffiliateLink
    });
    const slug = article.get("slug");
    const topic = article.get("topic").toLowerCase();
    const route = `/${topic}/${slug}`;
    const heroImageCredit = article.get("heroImageCredit");

    return (
      <Link to={route} onClick={onClickAnalyticAction}>
        <div tabIndex={0} role="link">
          {orientation === "portrait" && (
            <div className={classes.imgContainer}>
              <img
                alt={article.get("title")}
                className={
                  isActive ? classes.portrait : classes.portraitCollapsed
                }
                src={article.get("imgSrcGrid")}
              />
              <div className={classes.imgCreditPortrait}>{heroImageCredit}</div>
            </div>
          )}
          {orientation === "landscape" && (
            <div className={classes.imageContainer}>
              <img
                alt={article.get("title")}
                className={classes.landscape}
                src={article.get("imgSrcHero")}
              />
              <div className={classes.imgCreditLandscape}>
                {heroImageCredit}
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  get doShowAffiliateLink() {
    const { doShowAffiliateLinks, article, sessionVotes } = this.props;

    return (
      Boolean(
        article.get("amazonAffiliateData") || article.get("affiliateData")
      ) &&
      doShowAffiliateLinks &&
      isVoteInSession(article, sessionVotes)
    );
  }

  // Getters

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }

  get isVoteInSession() {
    return isVoteInSession(this.props.article, this.props.sessionVotes);
  }
}

// Type validation

Image.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  doShowAffiliateLinks: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
  onClickAnalyticAction: PropTypes.func,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  votes: PropTypes.shape({}).isRequired
};

Image.defaultProps = {
  doShowAffiliateLinks: false,
  onClickAnalyticAction: null
};

// Styles

Image.getClasses = config => {
  const styles = Image.getStyles(config);

  return {
    imageContainer: css(styles.imageContainer),
    imgContainer: css(styles.imgContainer),
    imgCreditPortrait: css([styles.imgCredit, styles.imgCreditPortrait]),
    imgCreditLandscape: css([styles.imgCredit, styles.imgCreditLandscape]),
    landscape: css(styles.landscape),
    portrait: css(styles.portrait),
    portraitCollapsed: css([styles.portrait, styles.portraitCollapsed]),
    portraitActiveInSessionCollapsed: css([
      styles.portrait,
      styles.portraitActiveInSessioCollapsed
    ])
  };
};

Image.getStyles = config => {
  let portraitHeight;

  if (config.isVoteInSession && config.doShowAffiliateLink) {
    portraitHeight = "100px";
  } else {
    portraitHeight = "224px";
  }

  return StyleSheet.create({
    imageContainer: {
      position: "relative",
      height: "210px",
      cursor: "pointer"
    },
    imgContainer: {
      position: "relative"
    },
    imgCredit: {
      position: "absolute",
      right: "10px",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
      fontFamily: "Open Sans",
      fontSize: "10px",
      lineHeight: "1.14",
      letterSpacing: "0.7px",
      color: "#ffffff"
    },
    imgCreditPortrait: {
      top: "10px",
      right: "10px"
    },
    imgCreditLandscape: {
      bottom: "10px",
      left: "10px"
    },
    landscape: {
      top: 0,
      left: 0,
      position: "absolute",
      height: "210px"
    },
    portrait: {
      width: "100%",
      height: "292px",
      objectFit: "cover",
      transition: "height 1.0s ease-out"
    },
    portraitCollapsed: {
      height: portraitHeight
    }
  });
};

// Exports

export default Image;
