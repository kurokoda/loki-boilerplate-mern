// Imports

import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import ICONS from "../constants/icons";
import {
  getTimeRemainingClassName,
  getTimeRemainingText
} from "../utils/article";

class HeaderPortrait extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { classes, timeRemainingText } = this;
    const { showTopic, orientation } = this.props;
    const topic = this.props.article.get("topic");

    return (
      <div className={classes.header}>
        {orientation === "portrait" && (
          <div className={classes.content}>
            {showTopic ? <div className={classes.topic}>{topic}</div> : null}
            <div className={classes.timeSectionPortrait}>
              <div className={classes.timeRemainingClassName}>
                {timeRemainingText}
              </div>
              <div className={classes.timeIcon} />
            </div>
          </div>
        )}
        {orientation === "landscape" && (
          <div className={classes.content}>
            <div className={classes.timeSectionLandscape}>
              <div className={classes.timeRemainingClassName}>
                {timeRemainingText}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Getters

  get timeRemainingText() {
    return getTimeRemainingText(this.props.article);
  }

  get timeRemainingClassName() {
    return getTimeRemainingClassName(this.props.article);
  }

  get classes() {
    const styles = HeaderPortrait.getStyles();

    return {
      header: css(styles.header),
      content: css(styles.content),
      topic: css(styles.topic),
      timeSectionPortrait: css(styles.timeSectionPortrait),
      timeSectionLandscape: css(styles.timeSectionLandscape),
      timeRemainingClassName: css(styles[this.timeRemainingClassName]),
      timeIcon: css(styles.timeIcon)
    };
  }
}

// Type validation

HeaderPortrait.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  orientation: PropTypes.string.isRequired,
  showTopic: PropTypes.bool
};

// Type validation

HeaderPortrait.defaultProps = {
  showTopic: false
};

// Styles

HeaderPortrait.getStyles = () =>
  StyleSheet.create({
    header: {
      backgroundColor: "white",
      maxWidth: "500px",
      height: "36px",
      fontFamily: "Open Sans",
      fontSize: "14px",
      color: "#000000"
    },
    content: {
      padding: "5px 0px 0px 0px",
      margin: "0 10px 0 10px"
    },
    timeSectionPortrait: {
      display: "flex",
      alignItems: "center",
      float: "right"
    },
    timeSectionLandscape: {
      margin: "5px 0px 0px 45px"
    },
    topic: {
      display: "inline-block",
      margin: "2px 0px 0px 0px"
    },
    timeLeft: {
      display: "inline-block"
    },
    closed: {
      display: "inline-block",
      fontWeight: "bold",
      color: "#ec008c"
    },
    timeIcon: {
      backgroundImage: ICONS.CLOCK,
      backgroundPositionX: "3px",
      backgroundPositionY: "3px",
      backgroundSize: "90%",
      backgroundRepeat: "no-repeat",
      display: "inline-block",
      height: "22px",
      width: "20px"
    }
  });

// Exports

export default HeaderPortrait;
