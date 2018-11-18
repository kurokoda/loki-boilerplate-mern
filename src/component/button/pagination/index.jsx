import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";

/**
 * A circular button with used by the `<Pagination>` component.
 */

export default class PaginationButton extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { children, onClick, disabled, active } = this.props;
    const classes = PaginationButton.getClasses({ disabled, active });
    return (
      <div
        className={classes.button}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        <div className={classes.text}>{children}</div>
      </div>
    );
  }
}

PaginationButton.propTypes = {
  /** Determines if the button is active, i.e. represents the index of the current page */
  active: PropTypes.bool,
  /** The button children, usually a string or number, but this value may be more complex, in the case of icons or images */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({})
  ]).isRequired,
  /** Determines if the button is disabled, i.e. a 'skip back' button when the pager index is zero */
  disabled: PropTypes.bool,
  /** The button onClick callback */
  onClick: PropTypes.func.isRequired
};

PaginationButton.defaultProps = {
  active: false,
  disabled: false
};

PaginationButton.getClasses = config => {
  const styles = PaginationButton.getStyles(config);

  return {
    button: css(styles.button),
    text: css(styles.text)
  };
};

PaginationButton.getStyles = config => {
  const { active, disabled } = config;

  return StyleSheet.create({
    button: {
      border: "solid 1px var(--white)",
      background: active
        ? "linear-gradient(to right, #686bc7 , #00f7a5)"
        : "white",
      color: disabled ? "#999" : active ? "white" : "black", // eslint-disable-line no-nested-ternary
      borderRadius: "20px",
      boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.2)",
      cursor: disabled ? "arrow" : "pointer",
      display: "inline-block",
      fontSize: "24px",
      fontWeight: "700",
      margin: "0 10px 0 10px",
      height: "40px",
      width: "40px",

      ":hover": {
        background: disabled
          ? "white"
          : "linear-gradient(to right, #4cd8ce , #03f6a7)"
      }
    },
    text: {
      padding: "5px 0 0 0"
    }
  });
};
