import { css, StyleSheet } from "aphrodite/no-important";

export default class Styles {
  static getClasses = () => {
    const styles = Styles.getStyles();

    return {
      container: css(styles.container),
      content: css(styles.content),
      index: css(styles.index),
      indexText: css(styles.indexText),
      overlay: css(styles.overlay),
      overlayCollapsed: css([styles.overlay, styles.overlayCollapsed])
    };
  };

  static getStyles(config) {
    return StyleSheet.create({
      container: {
        display: "inline-block",
        margin: "0 20px 20px 20px",
        position: "relative",
        width: "calc(100% - 33px)"
      },

      content: {
        margin: "0 auto 20px auto", maxWidth: "900px", position: "relative"
      },

      index: {
        position: "absolute",
        height: "74px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "36px",
        border: "1px solid #ebebeb",
        zIndex: "100",
        width: "74px",
        textAlign: "center",
        left: "-30px"
      },

      indexText: {
        fontSize: "40px", fontWeight: "700", margin: "10px 0 0 0", textSelect: "none"
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
  }
}
