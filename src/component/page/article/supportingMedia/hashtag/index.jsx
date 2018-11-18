import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class HashtagDivider extends PureComponent {
  static propTypes = {
    hashtag: PropTypes.string.isRequired,
    faction: PropTypes.string.isRequired
  };

  render() {
    const { hashtag, faction } = this.props;
    const classes = getClasses(faction);

    return (
      <div className={classes[faction]}>
        <span className={classes.hashtag}>{hashtag}</span>
      </div>
    );
  }
}

const getClasses = faction => {
  const styles = getStyles(faction);

  return {
    hashtag: css(styles.hashtag),
    yang: css([styles.divider, styles.yang]),
    yin: css([styles.divider, styles.yin])
  };
};

const getStyles = faction => {
  let color;
  if (faction === "yin") {
    color = "#4cd8ce";
  } else {
    color = "#f43082";
  }

  return StyleSheet.create({
    divider: {
      height: "6px",
      margin: "20px auto 40px auto",
      width: "100%"
    },
    yin: {
      backgroundImage: "linear-gradient(to right, #4cd8ce, #00f7a5)"
    },
    yang: {
      backgroundImage: "linear-gradient(to right, #f43082, #f37885)"
    },
    hashtag: {
      backgroundColor: color,
      color: "#FFFFFF",
      display: "inline-block",
      fontFamily: "Open Sans",
      fontSize: "14px",
      fontWeight: "600",
      padding: "2px 8px 2px 8px"
    }
  });
};

export default HashtagDivider;
