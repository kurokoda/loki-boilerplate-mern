import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import TyltLogo from "../../assets/images/logo/Tylt_Logo_Dark.svg";
import { ICON } from "../../constants";

/**
 * A loading indication which displays the Tylt logo
 * @returns {xml} The Loading component
 */
class Loading extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    return (
      <div className={css(styles.loading)}>
        <img alt="tylt-logo" src={TyltLogo} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    backgroundImage: ICON.SECTION.TYLT_LOGO_BLACK,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    width: "50%"
  }
});

export default Loading;
