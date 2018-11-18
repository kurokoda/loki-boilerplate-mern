// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Voting from "../../components/Voting";
import { isArticleActive } from "../../utils/article";
import Styles from "./styles";

class Secondary extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const classes = Styles.getClasses();
    const { isActive, props } = this;

    return (
      <div className={isActive ? classes.container : classes.containerInactive}>
        <Header {...props} />
        <Title {...props} displayAsBlock />
        <Voting {...props} />
      </div>
    );
  }

  // Getters

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }
}

// Type validation

Secondary.propTypes = {
  article: PropTypes.shape({}).isRequired,
  orientation: PropTypes.string.isRequired,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  showTopic: PropTypes.bool,
  votes: PropTypes.shape({}).isRequired
};

Secondary.defaultProps = {
  showTopic: false
};

// Exports

export default Secondary;
