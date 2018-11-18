// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { isArticleActive, isArticleClosed } from "../utils/article";
import { blackTapeText } from "../utils/style";

class Title extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { classes, plaintextTitle } = this;
    const { article, displayAsBlock, votes } = this.props;
    const isClosed = isArticleClosed(article);
    const userVote = votes.get(article.get("slug"));
    const isActive = !isClosed && !userVote;
    const styledText = blackTapeText(article.get("title"));

    return (
      <div
        className={isActive ? classes.container : classes.containerCollapsed}
      >
        {isActive ? (
          <div
            className={
              displayAsBlock ? classes.styledText : classes.styledTextOffset
            }
            ref={elem => {
              this.styledText = elem;
            }}
          >
            {styledText}
          </div>
        ) : (
          <div className={classes.plaintextTitle}>{plaintextTitle}</div>
        )}
      </div>
    );
  }

  // Getters

  get isActive() {
    return isArticleActive(this.props.article, this.props.votes);
  }

  get classes() {
    const { styledText } = this;
    const { orientation } = this.props;

    const styles = Title.getStyles({ orientation, styledText });

    return {
      styledText: css(styles.styledText),
      styledTextOffset: css([styles.styledText, styles.styledTextOffset]),
      container: css(styles.container),
      containerCollapsed: css([styles.container, styles.containerCollapsed]),
      plaintextTitle: css(styles.plaintextTitle),
      titleCollapsed: css([styles.title, styles.titleCollapsed])
    };
  }

  get plaintextTitle() {
    const { article } = this.props;
    const maxLength = 40;
    let title = article.get("title");

    if (title.length > maxLength) {
      title = title.slice(0, maxLength).concat("...");
    }

    return title;
  }
}

// Type validation

Title.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  displayAsBlock: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
  votes: PropTypes.shape({}).isRequired
};

Title.defaultProps = {
  displayAsBlock: false
};

// Styles

Title.getStyles = config => {
  const { orientation, styledText } = config;
  const textHeight = styledText ? styledText.clientHeight : 20;

  return StyleSheet.create({
    container: {
      fontFamily: "Avenir Next",
      fontWeight: "600",
      position: "relative",
      transition: "height 0.5s ease-out",
      minHeight: orientation === "portrait" ? "26px" : "24px"
    },

    containerCollapsed: {
      minHeight: orientation === "portrait" ? "20px" : "38px"
    },

    styledText: {
      fontSize: "22px",
      width: "calc(100% - 34px)",
      padding: orientation === "portrait" ? "0 0 6px 14px" : "0 0 0 14px"
    },
    styledTextOffset: {
      position: "absolute",
      top: `-${textHeight - 20}px`
    },
    plaintextTitle: {
      padding: "7px 10px 0px 10px"
    }
  });
};

// Exports

export default Title;
