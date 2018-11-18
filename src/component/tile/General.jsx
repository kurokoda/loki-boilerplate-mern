import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { formatArticleSrcSetForTile } from "../../utils/article";
import { InteractiveButton } from "../button";

// Exports -----------------------------

class GeneralTile extends Component {
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
    const topic = config.get("topic");
    const slug = config.get("slug");
    const topicLowercase = config.get("topic").toLowerCase();
    const articleRoute = `/${topicLowercase}/${slug}`;

    const styles = GeneralTile.getStyles();

    return (
      <div name="generalArticle" className={css(styles.generalArticle)}>
        <div name="topic" className={css(styles.topic)}>
          {topic}
        </div>
        <div name="content" className={css(styles.content)}>
          <div className={css(styles.imageContainer)}>
            <img
              name="image"
              className={css(styles.image)}
              src={defaultImageURL}
              srcSet={imageURLs}
              alt={title}
              sizes="auto"
            />
          </div>
          <div name="overlay" className={css(styles.overlay)}>
            <Link to={articleRoute}>
              <div
                name="overlayBackground"
                className={css(styles.overlayBackground)}
              />
            </Link>
            <div name="buttonContainer" className={css(styles.buttonContainer)}>
              <InteractiveButton
                theme="aqua"
                text="VOTE NOW"
                onClick={this.onClickAnalyticAction}
                route={articleRoute}
              />
            </div>
          </div>
        </div>
        <Link to={articleRoute}>
          <div name="title" className={css(styles.title)}>
            {title}
          </div>
        </Link>
      </div>
    );
  }

  onClickAnalyticAction = () => {
    const { analyticsCallArticleLinkAction } = this.props;
    analyticsCallArticleLinkAction();
  };
}

export default withRouter(GeneralTile);

GeneralTile.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

// Styles -----------------------------

GeneralTile.getStyles = config =>
  StyleSheet.create({
    buttonContainer: {
      position: "absolute",
      width: "100%",
      top: "calc(50% - 20px)",

      "@media (max-width: 1233px)": {
        display: "none"
      }
    },
    content: {
      position: "relative"
    },
    image: {
      width: "100%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    imageContainer: {
      position: "relative",
      cursor: "pointer"
    },
    overlay: {
      cursor: "pointer",
      opacity: "0.0",
      padding: "0 0 66.67% 0",
      position: "absolute",
      top: "0",
      transition: "opacity 0.5s",
      width: "100%",

      ":hover": {
        opacity: "1.0"
      }
    },
    overlayBackground: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      padding: "0 0 66.67% 0",
      position: "absolute",
      top: "0",
      width: "100%"
    },
    tileArticle: {
      width: "100%"
    },
    title: {
      color: "black",
      fontSize: "18px",
      fontWeight: "700",
      padding: "15px 0 0 0",

      "@media (max-width: 768px)": {
        fontSize: "14px"
      }
    },
    topic: {
      color: "black",
      fontSize: "18px",
      padding: "5px 0 0 0",

      "@media (max-width: 768px)": {
        fontSize: "12px"
      }
    }
  });
