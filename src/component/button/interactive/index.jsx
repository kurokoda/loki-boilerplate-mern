import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * A pill-shaped button with static color schemes.
 */

export default class InteractiveButton extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { theme, text, icon, onClick } = this.props;
    const className = css([styles.button, styles[theme]]);
    const { route } = this.props;

    return (
      <Link
        name="interactiveButton"
        className={className}
        onClick={this.onClick}
        onKeyDown={onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="button"
        tabIndex={0}
        to={route}
      >
        {icon && <i className={icon} />}
        <span className={css(styles.textSize)}>{text}</span>
      </Link>
    );
  }

  onClick = () => {
    this.props.onClick();
  };

  onMouseEnter = () => {
    this.setState({ active: true });
  };

  onMouseLeave = () => {
    this.setState({ active: false });
  };
}

InteractiveButton.propTypes = {
  route:
    PropTypes.string.isRequired /** The button route when clicked (optional) */,
  onClick: PropTypes.func /** The button onClick callback */,
  theme: PropTypes.string /** The button color scheme */,
  icon: PropTypes.string /** The button icon (optional) */,
  text: PropTypes.string /** The button label (optional) */
};

InteractiveButton.defaultProps = {
  onClick: null,
  theme: null,
  icon: null,
  text: "text"
};

const animationKeyframes = {
  "0%": {
    backgroundPosition: "0%"
  },

  "100%": {
    backgroundPosition: "100%"
  }
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
    padding: "3px 0 0 10px"
  },
  white: {
    border: "1px solid #666",
    background: "white",
    color: "#666"
  },
  textSize: {
    fontSize: "14px",
    margin: "0 0 -2px 0"
  },
  aqua: {
    animationName: animationKeyframes,
    animationDuration: "10s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    background:
      "linear-gradient(to right, #f33182 , #56cbfa, #f33182, #56cbfa, #f33182)",
    backgroundSize: "200% 200%",
    color: "white"
  },
  coral: {
    animationName: animationKeyframes,
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
  coralInactive: {
    border: "2px solid white",
    color: "white"
  }
});
