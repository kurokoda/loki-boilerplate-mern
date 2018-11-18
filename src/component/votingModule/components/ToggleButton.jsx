import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import ICONS from "../constants/icons";
import { isArticleActive, isArticleClosed } from "../utils/article";

class ToggleButton extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const {
      sliderTextRight,
      sliderTextLeft,
      isClosed,
      didVoteForWinner,
      classes
    } = this;

    let toggleButtonIconClassName;
    if (isClosed) {
      toggleButtonIconClassName = classes.toggleButtonIconCross;
    } else if (didVoteForWinner) {
      toggleButtonIconClassName = classes.toggleButtonIconCheck;
    } else {
      toggleButtonIconClassName = classes.toggleButtonIconDash;
    }

    return (
      <div className={classes.toggleComponent}>
        <div className={classes.slider}>
          <span className={classes.sliderTextLeft}>{sliderTextLeft}</span>
          <div className={classes.sliderBackground}>
            <div className={classes.toggleButton}>
              <div className={toggleButtonIconClassName} />
            </div>
          </div>
          <span className={classes.sliderTextRight}>{sliderTextRight}</span>
        </div>
      </div>
    );
  }

  // Getters

  get isActive() {
    const { article, votes } = this.props;
    return isArticleActive(article, votes);
  }

  get isClosed() {
    const { article } = this.props;
    return isArticleClosed(article);
  }

  get isUserThisFaction() {
    const { article, faction, votes } = this.props;
    return votes.get(article.get("slug")) === faction;
  }

  get sliderTextRight() {
    const { article, vote, votes, faction } = this.props;
    const isActive =
      !isArticleClosed(article) && !votes.get(article.get("slug"));
    return isActive ? "VOTE" : `${vote[faction]}%`;
  }

  get sliderTextLeft() {
    const { vote, faction } = this.props;
    return `${vote[faction] || "0.0"}%`;
  }

  get didVoteForWinner() {
    const { article, votes, faction } = this.props;
    return votes.get(article.get("slug")) === faction;
  }

  get classes() {
    const styles = ToggleButton.getStyles();

    return {
      slider: this.isUserThisFaction
        ? css([styles.slider, styles.sliderClosed])
        : css([styles.slider, styles.sliderOpen]),
      sliderBackground: css([
        styles.sliderBackground,
        styles[this.props.faction]
      ]),
      sliderTextLeft: css([styles.sliderText, styles.sliderTextLeft]),
      sliderTextRight: css([
        styles.sliderText,
        styles.sliderTextRight,
        this.isActive ? styles.active : styles.inactive
      ]),
      toggleButton: css(styles.toggleButton),
      toggleButtonIconCheck: css([styles.icon, styles.iconCheck]),
      toggleButtonIconCross: css([styles.icon, styles.iconCross]),
      toggleButtonIconDash: css([styles.icon, styles.iconDash]),
      toggleComponent: css(styles.toggleComponent)
    };
  }
}

// Type validation

ToggleButton.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  faction: PropTypes.string.isRequired,
  vote: PropTypes.shape({}).isRequired,
  votes: PropTypes.shape({}).isRequired
};

ToggleButton.defaultProps = {
  manualVoteActionArticle: null,
  manualVoteActionCategory: null
};

// Styles

ToggleButton.getStyles = config =>
  StyleSheet.create({
    active: {},
    icon: {
      backgroundSize: "100%",
      height: "20px",
      width: "20px",
      opacity: "0.75"
    },

    iconCross: {
      backgroundImage: ICONS.CROSS
    },

    iconDash: {
      backgroundImage: ICONS.DASH
    },

    iconCheck: {
      backgroundImage: ICONS.CHECK_MARK
    },

    inactive: {
      color: "#999"
    },

    slider: {
      position: "relative",
      width: "260px",
      display: "flex",
      alignItems: "center",
      left: "-107px",
      transition: "left 0.25s ease-out"
    },

    sliderClosed: {
      left: "-46px"
    },

    sliderOpen: {
      left: "-114px"
    },

    sliderBackground: {
      display: "inline-block",
      height: "30px",
      width: "30px",
      borderRadius: "50%",
      border: "solid 1px #c2c2c2",
      backgroundImage: "linear-gradient(to left, #ff6b79, #fffff)"
    },

    sliderText: {
      width: "140px",
      padding: "0 10px 0 10px",
      fontSize: "16px"
    },

    sliderTextRight: {
      textAlign: "left"
    },

    sliderTextLeft: {
      fontWeight: "bold",
      textAlign: "right"
    },

    toggleButton: {
      height: "40px",
      padding: "5px",
      position: "relative",
      transition: "right 2.0s",
      width: "40px"
    },

    toggleComponent: {
      position: "absolute",
      top: "calc(50% - 16px)",
      height: "32px",
      width: "100px",
      right: "10px",
      borderRadius: "26px",
      border: "solid 1px #e1e1e1",
      backgroundImage: "linear-gradient(to right, #ebebeb, #ffffff)",
      borderColor: "#dfdfdf",
      fontFamily: "Open Sans",
      fontSize: "24px",
      overflow: "hidden"
    },

    yang: {
      backgroundColor: "#f33182"
    },

    yin: {
      backgroundColor: "#4cd8ce"
    }
  });

// Exports

export default ToggleButton;
