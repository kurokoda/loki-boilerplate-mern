import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { GradientButton } from "../button";

// Exports -----------------------------

class CallToActionTile extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const styles = CallToActionTile.getStyles();
    const { config } = this.props;
    const action = config.get("action");

    return (
      <div className={css(styles.content)}>
        <div className={css(styles.title)}>
          <span>{CallToActionTile.getTitle(action)}</span>
        </div>
        <div className={css(styles.text)}>
          {CallToActionTile.getSubtitle(action)}
        </div>
        <GradientButton
          icon={CallToActionTile.getIcon(action)}
          theme={CallToActionTile.getTheme(action)}
          text={CallToActionTile.getButtonText(action)}
          onClick={CallToActionTile.getOnClick(action)}
        />
      </div>
    );
  }
}

export default CallToActionTile;

CallToActionTile.propTypes = {
  config: ImmutablePropTypes.map.isRequired
};

// Styles -----------------------------

CallToActionTile.getStyles = () =>
  StyleSheet.create({
    content: {
      padding: "20px",
      border: "2px solid black",
      minHeight: "70px"
    },
    title: {
      fontSize: "20px",
      fontWeight: "600"
    },
    text: {
      fontSize: "18px",
      fontWeight: "400",
      paddingBottom: "20px"
    }
  });

CallToActionTile.getTitle = action => {
  let result;
  switch (action) {
    case "instagram-follow":
    case "twitter-follow":
    case "facebook-follow":
      result = "MAKE YOUR VOICE HEARD!";
      break;
    default:
  }
  return result;
};

CallToActionTile.getSubtitle = action => {
  let result;
  switch (action) {
    case "instagram-follow":
      result = "Like us on Instagram and be part of the conversation";
      break;
    case "twitter-follow":
      result = "Follow us on Twitter and be part of the conversation";
      break;
    case "facebook-follow":
      result = "Like us on Facebook and be part of the conversation";
      break;
    default:
      throw Error("Invalid action type");
  }
  return result;
};

CallToActionTile.getIcon = action => {
  let result;

  switch (action) {
    case "instagram-follow":
      result = "fab fa-instagram";
      break;
    case "twitter-follow":
      result = "fab fa-twitter";
      break;
    case "facebook-follow":
      result = "fab fa-facebook";
      break;
    default:
      throw Error("Invalid action type");
  }
  return result;
};

CallToActionTile.getTheme = action => {
  let result;

  switch (action) {
    case "instagram-follow":
    case "twitter-follow":
    case "facebook-follow":
      result = "aqua";
      break;
    default:
      throw Error("Invalid action type");
  }
  return result;
};

CallToActionTile.getButtonText = action => {
  let result;

  switch (action) {
    case "instagram-follow":
    case "twitter-follow":
      result = "FOLLOW";
      break;
    case "facebook-follow":
      result = "LIKE";
      break;
    default:
  }
  return result;
};

CallToActionTile.getOnClick = action => {
  let onClick;
  switch (action) {
    case "instagram-follow":
      onClick = () => {
        window.open("https://www.instagram.com/thetylt/");
      };
      break;
    case "twitter-follow":
      onClick = () => {
        window.open("https://twitter.com/TheTylt");
      };
      break;
    case "facebook-follow":
      onClick = () => {
        window.open("https://www.facebook.com/TheTylt");
      };
      break;
    default:
  }
  return onClick;
};
