// Imports

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";
import Voting from "../../components/Voting";
import {
  getTimeRemainingText,
  getTimeRemainingClassName,
  isArticleActive,
  isVoteInSession
} from "../../utils/article";
import { blackTapeText } from "../../utils/style";
import Styles from "./styles";

class Primary extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { props, isActive, timeRemainingText } = this;
    const { article, index, onClickAnalyticAction, showTopic } = this.props;
    const imageCredit = article.get("heroImageCredit");
    const slug = article.get("slug");
    const topic = article.get("topic").toLowerCase();
    const route = `/${topic}/${slug}`;
    const title = blackTapeText(article.get("title"));
    const classes = Styles.getClasses({
      isVoteInSession: this.isVoteInSession,
      doShowAffiliateLink: this.doShowAffiliateLink
    });

    return (
      <div className={classes.container}>
        {/* INDEX SECTION */}
        {index && (
          <div className={classes.indexContainer}>
            <div className={classes.index}>{index}</div>
          </div>
        )}
        {/* HEADER SECTION */}
        <div className={classes.header}>
          {showTopic ? (
            <div className={classes.headerTopic}>{topic}</div>
          ) : null}
          <div className={classes.headerTimeSection}>
            <div className={classes.headerTimeRemaining}>
              {timeRemainingText}
            </div>
            <div className={classes.headerTimeIcon} />
          </div>
        </div>
        {/* IMAGE SECTION */}
        <Link to={route} onClick={onClickAnalyticAction}>
          <div className={classes.imageContainer}>
            <img
              alt={article.get("title")}
              className={isActive ? classes.image : classes.imageCollapsed}
              src={article.get("imgSrcGrid")}
            />
            <div className={classes.imageCredit}>{imageCredit}</div>
          </div>
          <div className={classes.titleContainer}>
            <div className={classes.title}>{title}</div>
          </div>
        </Link>
        {/* VOTING SECTION */}
        <div className={classes.votingContainer}>
          <Voting {...props} doShowAffiliateLinks />
        </div>
      </div>
    );
  }

  get doShowAffiliateLink() {
    const { doShowAffiliateLinks, article, sessionVotes } = this.props;

    return (
      doShowAffiliateLinks &&
      article.get("affiliateLink") &&
      isVoteInSession(article, sessionVotes) &&
      this.props.votes.get(article.get("slug")) === this.props.faction
    );
  }

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }

  get isVoteInSession() {
    return isVoteInSession(this.props.article, this.props.sessionVotes);
  }

  get timeRemainingClassName() {
    return getTimeRemainingClassName(this.props.article);
  }

  get timeRemainingText() {
    return getTimeRemainingText(this.props.article);
  }
}

// Static

// Type validation

Primary.propTypes = {
  article: PropTypes.shape({}).isRequired,
  index: PropTypes.number,
  orientation: PropTypes.string.isRequired,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  showTopic: PropTypes.bool,
  votes: PropTypes.shape({}).isRequired
};

// Default values

Primary.defaultProps = {
  index: 0,
  showTopic: false
};

// Exports

export default Primary;
