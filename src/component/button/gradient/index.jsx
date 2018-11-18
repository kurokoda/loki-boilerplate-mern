import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";

/**
 * A pill-shaped animated button with gradient color schemes.
 */

export default class GradientButton extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { theme, text, icon, onClick } = this.props;

    return (
      <div
        className={css([styles.button, styles[theme]])}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        {icon && <i className={icon} />}
        <span className={css(styles.spacer)}>{text}</span>
      </div>
    );
  }
}

GradientButton.animationKeyframes = {
  "0%": {
    backgroundPosition: "0%"
  },

  "100%": {
    backgroundPosition: "100%"
  }
};

GradientButton.propTypes = {
  /** The button onClick callback */
  onClick: PropTypes.func.isRequired /** The button color scheme */,
  theme: PropTypes.string /** The button icon (optional) */,
  icon: PropTypes.string /** The button label (optional) */,
  text: PropTypes.string
};

GradientButton.defaultProps = {
  theme: null,
  icon: null,
  text: "text"
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    height: "40px",
    width: "140px",
    padding: "0 20px 0 20px",
    cursor: "pointer",
    margin: "auto"
  },
  spacer: {
    padding: "0 0 0 10px"
  },
  white: {
    border: "1px solid #666",
    background: "white",
    color: "#666"
  },
  textSize: {
    fontSize: "18px",
    margin: "0 0 -3px 0"
  },
  aqua: {
    animationName: GradientButton.animationKeyframes,
    animationDuration: "10s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    background:
      "linear-gradient(to right, #f33182 , #56cbfa, #f33182, #56cbfa, #f33182)",
    backgroundSize: "200% 200%",
    color: "white"
  },
  coral: {
    animationName: GradientButton.animationKeyframes,
    animationDuration: "10s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    background:
      "linear-gradient(to right, #00f6a5 , #6c6ec8, #00f6a5 , #6c6ec8, #00f6a5)",
    backgroundSize: "200% 200%",
    color: "white"
  },
  whiteInactive: {
    border: "1px solid #999",
    background: "white",
    color: "#999"
  },
  aquaInactive: {
    border: "2px solid white",
    color: "white"
  },
  coralInactive: {
    border: "2px solid white",
    color: "white"
  }
});
