// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { isArticleActive } from "../utils/article";
import Social from "./Social";
import VoteMeter from "./VoteMeter";

class Voting extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const classes = Voting.getClasses();
    const { doShowSocial, props } = this;

    return (
      <div className={classes.container}>
        <div className={classes.buttons}>
          <VoteMeter faction="yin" {...props} />
          <VoteMeter faction="yang" {...props} />
        </div>
        {doShowSocial && <Social {...props} />}
      </div>
    );
  }

  // Getters

  get doShowSocial() {
    return !isArticleActive(this.props.article, this.props.votes);
  }
}

// Type validation

Voting.propTypes = {
  animated: PropTypes.bool.isRequired,
  article: ImmutablePropTypes.map.isRequired,
  castVote: PropTypes.func.isRequired,
  doShowAffiliateLinks: PropTypes.bool,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  vote: PropTypes.shape({}).isRequired,
  votes: PropTypes.shape({}).isRequired,
  socialShareAction: PropTypes.func,
  manualVoteActionArticle: PropTypes.func,
  postVoteShareActionArticle: PropTypes.func,
  postVoteShareActionCategory: PropTypes.func,
  manualVoteActionCategory: PropTypes.func
};

Voting.defaultProps = {
  doShowAffiliateLinks: false,
  manualVoteActionArticle: null,
  postVoteShareActionArticle: null,
  socialShareAction: null,
  postVoteShareActionCategory: null,
  manualVoteActionCategory: null
};

// Styles

Voting.getClasses = () => {
  const styles = Voting.getStyles();

  return {
    container: css(styles.container),
    votingButtons: css(styles.votingButtons)
  };
};

Voting.getStyles = () =>
  StyleSheet.create({
    container: {
      margin: "0 10px 0 10px",
      overflow: "hidden"
    },
    buttons: {
      margin: "0 0 10px 0"
    }
  });

Voting.factions = ["yin", "yang"];

// Exports

export default Voting;
