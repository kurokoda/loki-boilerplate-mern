// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import {
  isArticleActive,
  isArticleClosed,
  isVoteInSession
} from "../utils/article";
import AffiliateLink from "./AffiliateLink";
import ToggleButton from "./ToggleButton";
import { ROUTE as ROUTE_REGEX } from "../../../constants/regex";

const CANVAS_HEIGHT = 54;

class VoteMeter extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  constructor(props) {
    super(props);
    this.canvasID = `${props.article.get("slug")}-${props.faction}-canvas`;
  }

  componentDidUpdate() {
    if (this.voteButton.clientWidth < 500) this.renderSlider();
  }

  render() {
    const { canvasID, classes, hashtag, doShowAffiliateLink } = this;
    const { article, faction, vote, votes } = this.props;
    const hasAffiliateLinkData = Boolean(
      article.get("affiliateData") || article.get("amazonAffiliateData")
    );
    const voteButtonWidth = this.voteButton ? this.voteButton.clientWidth : 0;

    return (
      <Fragment>
        <div
          name="voteButton"
          className={classes.voteButton}
          onClick={this.castVote}
          ref={element => {
            this.voteButton = element;
          }}
          role="button"
          tabIndex={0}
        >
          <canvas
            name="voteButtonCanvas"
            id={canvasID}
            width={voteButtonWidth}
            height={56}
          />
          <div name="hashtag" className={classes.hashtag}>
            {hashtag}
          </div>
          <ToggleButton
            article={article}
            faction={faction}
            vote={vote}
            votes={votes}
          />
        </div>
        {doShowAffiliateLink &&
          hasAffiliateLinkData && (
            <AffiliateLink
              vote={votes.get(article.get("slug"))}
              article={article}
            />
          )}
      </Fragment>
    );
  }

  castVote = event => {
    const {
      article,
      castVote,
      faction,
      manualVoteActionArticle,
      manualVoteActionCategory,
      votes
    } = this.props;

    const hasVoted = Boolean(votes.get(article.get("slug")));

    if (hasVoted) return;

    const url = window.location.pathname;
    const isTopicRoute = ROUTE_REGEX.TOPIC_PAGE.test(url);
    const isArticleRoute = ROUTE_REGEX.ARTICLE_PAGE.test(url);
    let result;

    if (!isArticleClosed(article)) {
      castVote(article, faction);
    }

    if (isArticleRoute && manualVoteActionArticle) {
      result = manualVoteActionArticle;
    } else if (isTopicRoute && manualVoteActionCategory) {
      result = manualVoteActionCategory;
    } else {
      result = null;
    }

    result(article, faction);
    event.preventDefault();
    event.stopPropagation();
  };

  // Business logic

  renderSlider() {
    this.renderCanvasGradient();
    this.renderCanvas();
  }

  renderCanvas() {
    const {
      animated,
      article,
      faction,
      onAnimationComplete,
      votes,
      vote
    } = this.props;
    const voteButtonWidth = this.voteButton ? this.voteButton.clientWidth : 0;

    if (!this.isActive) {
      const votePercentage = vote[faction] || 0;
      const targetPosition = voteButtonWidth * votePercentage * 0.01;

      if (!animated) {
        this.drawSlider(targetPosition);
      } else {
        let currentPosition = 0;
        const animationInterval = setInterval(() => {
          if (currentPosition < targetPosition) {
            const diff = targetPosition - currentPosition;
            currentPosition += 1 + diff * 0.1;
            this.drawSlider(currentPosition);
          } else {
            clearInterval(animationInterval);
            onAnimationComplete(article.get("slug"));
          }
        }, 33);
      }
    }
  }

  renderCanvasGradient() {
    const { faction, vote } = this.props;
    const canvas = document.getElementById(this.canvasID).getContext("2d");
    const votePercentage = vote[faction] || 0;
    const voteButtonWidth = this.voteButton ? this.voteButton.clientWidth : 0;
    const targetPosition = voteButtonWidth * votePercentage * 0.01;
    const colors =
      faction === "yang"
        ? {
            light: "#f37885",
            dark: "#f43082"
          }
        : {
            light: "#00f7a5",
            dark: "#4cd8ce"
          };

    this.gradient = canvas.createLinearGradient(
      0,
      0,
      targetPosition + 45,
      CANVAS_HEIGHT
    );
    this.gradient.addColorStop(0, colors.dark);
    this.gradient.addColorStop(1, colors.light);
  }

  drawSlider(position) {
    const canvasElement = document.getElementById(this.canvasID);
    if (!canvasElement) return;

    const canvas = document.getElementById(this.canvasID).getContext("2d");
    canvas.beginPath();
    canvas.moveTo(0, 0);
    canvas.lineTo(position + 20, 0);
    canvas.lineTo(position, CANVAS_HEIGHT);
    canvas.lineTo(0, CANVAS_HEIGHT);
    canvas.lineTo(0, 0);
    canvas.fillStyle = this.gradient;
    canvas.fill();
  }

  // Getters

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }

  get hashtag() {
    return this.props.article.getIn(["voting", this.props.faction, "hashtag"]);
  }

  get classes() {
    const componentWidth = this.voteButton ? this.voteButton.clientWidth : 0;
    const styles = VoteMeter.getStyles({ componentWidth });

    return {
      hashtag: this.isActive
        ? css([styles.hashtag, styles[this.props.faction]])
        : css(styles.hashtag),
      voteButton: css([
        styles.voteButton,
        this.isActive ? styles.cursorPointer : styles.cursorArrow
      ])
    };
  }

  get doShowAffiliateLink() {
    const {
      article,
      doShowAffiliateLinks,
      faction,
      sessionVotes,
      votes
    } = this.props;

    return (
      Boolean(
        article.get("amazonAffiliateData") || article.get("affiliateData")
      ) &&
      doShowAffiliateLinks &&
      isVoteInSession(article, sessionVotes) &&
      votes.get(article.get("slug")) === faction
    );
  }
}

// Type validation

VoteMeter.propTypes = {
  animated: PropTypes.bool.isRequired,
  article: ImmutablePropTypes.map.isRequired,
  doShowAffiliateLinks: PropTypes.bool.isRequired,
  vote: PropTypes.shape({}).isRequired,
  votes: ImmutablePropTypes.map.isRequired,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  faction: PropTypes.oneOf(["yang", "yin"]).isRequired,
  castVote: PropTypes.func.isRequired,
  onAnimationComplete: PropTypes.func.isRequired,
  manualVoteActionArticle: PropTypes.func,
  manualVoteActionCategory: PropTypes.func
};

VoteMeter.defaultProps = {
  manualVoteActionArticle: null,
  manualVoteActionCategory: null
};

// Static

VoteMeter.getStyles = () =>
  StyleSheet.create({
    cursorArrow: {
      cursor: "arrow"
    },
    cursorPointer: {
      cursor: "pointer"
    },
    hashtag: {
      color: "black",
      display: "inline-block",
      fontFamily: "Avenir Next",
      fontSize: "19px",
      fontWeight: "bold",
      left: "10px",
      position: "absolute",
      top: "calc(50% - 12px)",

      "@media (max-width: 420px)": {
        fontSize: "14px",
        left: "6px",
        top: "18px"
      }
    },
    voteButton: {
      boxSizing: "border-box",
      position: "relative",
      backgroundColor: "#ffffff",
      border: "solid 1px #acacac",
      height: "56px",
      width: "100%",
      margin: "10px 0 0 0"
      // overflow: "hidden"
    },
    yang: {
      color: "#f33182"
    },
    yangVoteMeterBackGround: {
      position: "absolute",
      backgroundColor: "#f33182"
    },
    yin: {
      color: "#4cd8ce"
    },
    yinVoteMeterBackGround: {
      position: "absolute",
      backgroundColor: "#4cd8ce"
    }
  });

// Exports

export default VoteMeter;
