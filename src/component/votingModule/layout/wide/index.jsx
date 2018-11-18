// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import Header from "../../components/Header";
import Image from "../../components/image";
import Title from "../../components/Title";
import Voting from "../../components/Voting";
import { isArticleActive } from "../../utils/article";
import Styles from "./styles";

class Wide extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const classes = Styles.getClasses();
    const { isActive, props } = this;
    const { index } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          {index && (
            <div className={classes.index}>
              <div className={classes.indexText}>{index}</div>
            </div>
          )}
          <div>
            <Header {...props} />
            <Image {...props} />
          </div>
          <div
            className={isActive ? classes.overlay : classes.overlayCollapsed}
          >
            <Title {...props} />
            <Voting {...props} />
          </div>
        </div>
      </div>
    );
  }

  // Getters

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }
}

Wide.getClasses = () => {
  const styles = Wide.getStyles();

  return {
    container: css(styles.container),
    content: css(styles.content),
    index: css(styles.index),
    indexText: css(styles.indexText),
    overlay: css(styles.overlay),
    overlayCollapsed: css([styles.overlay, styles.overlayCollapsed])
  };
};

// Styles

Wide.getStyles = () =>
  StyleSheet.create({
    container: {
      display: "inline-block",
      margin: "0 20px 20px 20px",
      position: "relative",
      width: "calc(100% - 33px)"
    },

    content: {
      margin: "0 auto 20px auto",
      maxWidth: "900px",
      position: "relative"
    },

    index: {
      position: "absolute",
      height: "74px",
      backgroundColor: "white",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderRadius: "36px",
      border: "1px solid #ebebeb",
      zIndex: "100",
      width: "74px",
      textAlign: "center",
      left: "-30px"
    },

    indexText: {
      fontSize: "40px",
      fontWeight: "700",
      margin: "10px 0 0 0",
      textSelect: "none"
    },

    overlay: {
      right: "0",
      position: "absolute",
      top: "78px",
      width: "400px",
      transition: "top 0.5s ease-out"
    },

    overlayCollapsed: {
      top: "0px"
    }
  });

// Type validation

Wide.propTypes = {
  article: PropTypes.shape({}).isRequired,
  orientation: PropTypes.string.isRequired,
  sessionVotes: ImmutablePropTypes.map.isRequired,
  votes: PropTypes.shape({}).isRequired,
  index: PropTypes.number
};

// Default values

Wide.defaultProps = {
  index: 0
};

// Exports

export default Wide;
