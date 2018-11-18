import { css, StyleSheet } from "aphrodite/no-important";

export default class Styles {
  static getClasses = () => {
    const styles = Styles.getStyles();

    return {
      container: css(styles.container),
      containerInactive: css([styles.container, styles.containerInactive])
    };
  };

  static getStyles() {
    return StyleSheet.create({
      container: {
        backgroundImage: "linear-gradient(to top, #ebebeb, #ffffff)",
        border: "solid 1px #e1e1e1",
        height: "234px",
        maxWidth: "500px",
        overflow: "hidden",
        padding: "0 0 10px 0",
        position: "relative",
        transition: "height 1.0s ease-out"
      },

      containerInactive: {
        height: "264px"
      }
    });
  }
}
