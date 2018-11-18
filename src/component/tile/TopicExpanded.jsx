import { css, StyleSheet } from "aphrodite";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { formatArticleSrcSetForTile } from "../../utils/article";

// Exports -----------------------------

class TopicExpanded extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { config } = this.props;
    const defaultImageURL = config.get("imgSrcGrid");
    const imageURLs = formatArticleSrcSetForTile(config.get("srcSetGrid"));
    const title = config.get("title");
    const slug = config.get("slug");
    const topic = config.get("topic").toLowerCase();
    const route = `/${topic}/${slug}`;

    const styles = TopicExpanded.getStyles({ titleRef: this.titleRef });

    return (
      <div name="topicTile" className={css(styles.topicTile)}>
        <div name="content" className={css(styles.content)}>
          <img
            name="image"
            className={css(styles.image)}
            src={defaultImageURL}
            srcSet={imageURLs}
            alt={title}
            sizes="auto"
          />
          <Link onClick={this.onClickAnalyticAction} to={route}>
            <div
              name="overlay"
              className={css(styles.overlay)}
              role="link"
              tabIndex={0}
            >
              <div
                name="overlayBackground"
                className={css(styles.overlayBackground)}
              />
            </div>
          </Link>
        </div>
        <div
          name="title"
          className={css(styles.title)}
          ref={titleRef => {
            this.titleRef = titleRef;
          }}
        >
          {title}
        </div>
      </div>
    );
  }

  onClickAnalyticAction = () => {
    const { analyticsCallArticleLinkAction } = this.props;
    analyticsCallArticleLinkAction();
  };
}

export default withRouter(TopicExpanded);

TopicExpanded.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

// Styles -----------------------------

TopicExpanded.getStyles = () =>
  StyleSheet.create({
    content: {
      position: "relative"
    },
    image: {
      boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "100%"
    },
    overlay: {
      cursor: "pointer",
      opacity: "0.0",
      padding: "0 0 66.67% 0",
      position: "absolute",
      top: "0",
      transition: "opacity 0.5s",
      width: "100%",
      zIndex: "3",

      ":hover": {
        opacity: "1.0"
      }
    },
    overlayBackground: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      width: "100%",
      top: "0",
      paddingBottom: "66.67%",
      position: "absolute"
    },
    title: {
      bottom: "20px",
      color: "white",
      fontFamily: "Avenir Next Bold",
      fontSize: "20px",
      left: "20px",
      position: "absolute",
      width: "80%",
      textShadow: "0 0 8px #000000",
      zIndex: "4",

      "@media (max-width: 480px)": {
        bottom: "-12px",
        fontSize: "20px"
      },

      "@media (max-width: 768px)": {
        bottom: "-12px",
        fontSize: "25px"
      },

      "@media (max-width: 1110px)": {
        bottom: "20px",
        fontSize: "18px"
      }
    },
    topicTile: {
      margin: "0 0 20px 0",
      position: "relative"
    }
  });
