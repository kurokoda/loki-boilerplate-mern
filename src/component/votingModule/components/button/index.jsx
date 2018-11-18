import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Button extends Component {
  state = {
    active: false
  };

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { children, onClick, theme } = this.props;
    const { active } = this.state;
    const className = css([
      styles.button,
      theme === "dark"
        ? styles.black
        : active
          ? styles.white
          : styles.whiteInactive
    ]);

    return (
      <div
        name="interactiveButton"
        className={className}
        onClick={onClick}
        onKeyDown={onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="button"
        tabIndex={0}
      >
        <span className={css(styles.textSize)}>{children}</span>
      </div>
    );
  }

  onMouseEnter = () => {
    this.setState({ active: true });
  };

  onMouseLeave = () => {
    this.setState({ active: false });
  };
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
    height: "30px",
    width: "200px",
    padding: "0 20px 0 20px",
    cursor: "pointer",
    margin: "auto"
  },
  spacer: {
    padding: "3px 0 0 10px"
  },
  textSize: {
    fontSize: "18px",
    margin: "0 0 -3px 0"
  },
  black: {
    border: "1px solid #666",
    background: "black",
    color: "#FFF"
  },
  white: {
    border: "1px solid #666",
    background: "white",
    color: "#666"
  },
  whiteInactive: {
    border: "1px solid #999",
    background: "white",
    color: "#999"
  }
});
