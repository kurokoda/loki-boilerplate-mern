import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { getIncrementedElementName } from "../../utils/collection";
import VotingModule from "../votingModule";

export default class Recent extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const {
      config,
      castVote,
      onAnimationComplete,
      onClickAnalyticAction,
      page,
      sessionVotes,
      votes,
      postVoteShareActionCategory,
      manualVoteActionCategory,
      votingModules
    } = this.props;
    const styles = Recent.getStyles();

    return (
      <div
        name="recentSection"
        className={css(styles.recentSection)}
        ref={element => {
          this.container = element;
        }}
      >
        <div name="topicHeader" className={css(styles.topicHeader)}>
          <span>Most Recent</span>
        </div>
        <hr
          name="horizontalDivider"
          className={css(styles.horizontalDivider)}
        />
        {config.map((article, index) => {
          const vote = {
            slug: article.get("slug"),
            yin: article.getIn(["voting", "yin", "score"]),
            yang: article.getIn(["voting", "yang", "score"])
          };
          return (
            <div
              className={css(styles.votingModule)}
              name="votingModule"
              key={getIncrementedElementName("votingModule")}
            >
              <VotingModule
                layout="wide"
                index={7 * (page - 1) + index + 1}
                castVote={castVote}
                onClickAnalyticAction={onClickAnalyticAction}
                onAnimationComplete={onAnimationComplete}
                article={article}
                sessionVotes={sessionVotes}
                vote={vote}
                votes={votes}
                postVoteShareActionCategory={postVoteShareActionCategory}
                manualVoteActionCategory={manualVoteActionCategory}
                animated={!votingModules.get(article.get("slug"))}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

Recent.propTypes = {
  castVote: PropTypes.func.isRequired,
  config: ImmutablePropTypes.list.isRequired,
  onAnimationComplete: PropTypes.func.isRequired,
  onClickAnalyticAction: PropTypes.func.isRequired,
  manualVoteActionCategory: PropTypes.func,
  page: PropTypes.number.isRequired,
  postVoteShareActionCategory: PropTypes.func,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  votes: ImmutablePropTypes.map.isRequired,
  /** The the state of all potential voting modules used to determine whether to animate vote meters */
  votingModules: ImmutablePropTypes.map.isRequired
};

Recent.defaultProps = {
  page: 1,
  postVoteShareActionCategory: null,
  manualVoteActionCategory: null
};

Recent.getStyles = () =>
  StyleSheet.create({
    recentSection: {
      maxWidth: `${window.innerWidth - 40}px`
    },
    topicHeader: {
      color: "#000000",
      display: "inline-block",
      fontSize: "50px",
      fontWeight: "700",

      "@media (max-width: 768px)": {
        fontSize: "45px"
      }
    },
    horizontalDivider: {
      backgroundColor: "#979797",
      height: "1px",
      margin: "-2px 0 0 0",
      maxWidth: "1240px",
      width: "100%"
    },
    votingModule: {
      margin: "20px 0 0 0"
    }
  });
