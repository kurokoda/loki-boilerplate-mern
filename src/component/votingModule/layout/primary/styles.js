import { css, StyleSheet } from "aphrodite/no-important";
import ICONS from "../../constants/icons";

export default class Styles {
  static getClasses(config) {
    const styles = Styles.getStyles(config);

    return {
      container: css(styles.container),
      header: css(styles.header),
      imageContainer: css(styles.imageContainer),
      imageCredit: css(styles.imageCredit),
      indexContainer: css(styles.indexContainer),
      index: css(styles.index),
      image: css(styles.image),
      imageCollapsed: css([styles.image, styles.imageCollapsed]),
      headerTimeIcon: css(styles.headerTimeIcon),
      headerTimeRemaining: css(styles[this.timeRemainingClassName]),
      headerTimeSection: css(styles.headerTimeSection),
      title: css(styles.title),
      titleContainer: css(styles.titleContainer),
      headerTopic: css(styles.headerTopic),
      votingContainer: css(styles.votingContainer)
    };
  }

  static getStyles(config) {
    let imageHeight;

    if (config.isVoteInSession && config.doShowAffiliateLink) {
      imageHeight = "100px";
    } else {
      imageHeight = "240px";
    }

    return StyleSheet.create({
      container: {
        position: "relative"
      },
      closed: {
        display: "inline-block",
        fontWeight: "bold",
        color: "#ec008c"
      },
      header: {
        backgroundColor: "white",
        color: "#000000",
        display: "flex",
        flexDirection: "row-reverse",
        fontFamily: "Open Sans",
        fontSize: "14px",
        height: "36px"
      },
      headerTopic: {
        display: "inline-block",
        margin: "2px 0px 0px 0px"
      },
      headerTimeIcon: {
        backgroundImage: ICONS.CLOCK,
        backgroundPositionX: "3px",
        backgroundPositionY: "3px",
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
        height: "22px",
        width: "20px"
      },
      headerTimeSection: {
        display: "flex",
        alignItems: "center",
        float: "right"
      },
      headerTimeLeft: {
        display: "inline-block"
      },
      container: {
        backgroundImage: "linear-gradient(to top, #ebebeb, #ffffff)",
        height: "500px",
        margin: "20px auto 0 auto",
        maxWidth: "500px",
        overflow: "hidden",
        position: "relative"
      },
      imageContainer: {
        position: "relative"
      },
      imageCredit: {
        color: "#ffffff",
        fontFamily: "Open Sans",
        fontSize: "10px",
        lineHeight: "1.14",
        letterSpacing: "0.7px",
        position: "absolute",
        right: "10px",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        top: "10px"
      },
      index: {
        marginTop: "10px"
      },
      indexContainer: {
        backgroundColor: "white",
        borderRadius: "25px",
        border: "1px solid #ebebeb",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        fontSize: "24px",
        fontWeight: "700",
        height: "50px",
        position: "absolute",
        textAlign: "center",
        top: "10px",
        width: "50px",
        zIndex: "100"
      },
      image: {
        height: "292px",
        objectFit: "cover",
        transition: "height 1.0s ease-out",
        width: "100%"
      },
      imageCollapsed: {
        height: imageHeight
      },
      title: {
        fontSize: "18px",
        left: "10px",
        position: "absolute",
        bottom: "-5px"
      },
      titleContainer: {
        margin: "0 10px 0 8px",
        padding: "0 0 0 0",
        position: "relative"
      },
      votingContainer: {
        padding: "10px 0 0 0"
      }
    });
  }
}
