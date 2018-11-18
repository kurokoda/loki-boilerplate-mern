import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import {
  formatArticleSrcSetForTile,
  getWinningFaction,
  getWinningHashtag
} from "../../utils/article";

// Exports -----------------------------

class ResultTile extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { textContent } = this;
    const { config } = this.props;

    const title = config.get("title");
    const topic = config.get("topic");
    const defaultImageURL = config.get("imgSrcGrid");
    const hashtag = getWinningHashtag(config);
    const imageURLs = formatArticleSrcSetForTile(config.get("srcSetGrid"));
    const faction = getWinningFaction(config);
    const percentage =
      faction === "tie"
        ? "50%"
        : `${config.getIn(["voting", faction, "score"])}%`;
    const styles = ResultTile.getStyles({ textContent });
    const slug = config.get("slug");
    const topicLowercase = config.get("topic").toLowerCase();
    const route = `/${topicLowercase}/${slug}`;

    return (
      <div name="resultTile" className={css(styles.resultTile)}>
        <div name="topic" className={css(styles.topic)}>
          {topic}
        </div>
        <Link onClick={this.onClickAnalyticAction} to={route}>
          <div
            name="imageContainer"
            className={css(styles.imageContainer)}
            onClick={this.onClick}
            role="link"
            tabIndex={0}
          >
            <img
              name="image"
              className={css(styles.image)}
              src={defaultImageURL}
              srcSet={imageURLs}
              alt={title}
              sizes="auto"
            />
            <div name="imageOverlay" className={css(styles.imageOverlay)}>
              <div name="textContainer" className={css(styles.textContainer)}>
                <div
                  name="hashtag"
                  className={css([styles.hashtag, styles[faction]])}
                >
                  {hashtag}
                </div>
                <div
                  name="percentage"
                  className={css([styles.percentage, styles[faction]])}
                >
                  {percentage}
                </div>
                <div name="title" className={css(styles.title)}>
                  {title}
                </div>
              </div>
            </div>
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

export default withRouter(ResultTile);

ResultTile.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

// Styles -----------------------------

ResultTile.getStyles = config =>
  StyleSheet.create({
    resultTile: {
      position: "relative",
      padding: "0 0 0 20px"
    },

    image: {
      width: "100%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    imageOverlay: {
      background:
        "linear-gradient(to right, rgba(0, 0, 0, 1.0), rgba(0, 0, 0, 0.0))",
      padding: "0 0 66.67% 0",
      position: "absolute",
      top: "0",
      width: "100%"
    },
    hashtag: {
      textShadow: "0 0 8px #000000",
      fontSize: "18px",
      fontWeight: "600"
    },
    imageContainer: {
      cursor: "pointer",
      position: "relative",
      width: "100%"
    },
    percentage: {
      fontSize: "45px",
      fontWeight: "600",
      lineHeight: "45px",
      textShadow: "0 0 8px #000000"
    },
    textContainer: {
      position: "absolute",
      bottom: "10px",
      left: "20px",
      width: "100%"
    },
    text: {
      color: "white",
      fontSize: "20px",
      fontWeight: "500",
      textShadow: "0 0 8px #000000"
    },
    tie: {
      color: "#ffffff"
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
      height: "40px",
      margin: "0 0 15px 0",
      width: "calc(100% - 40px)",

      "@media (max-width: 350px)": {
        fontSize: "12px"
      }
    },
    topic: {
      fontSize: "20px"
    },
    content: {
      left: "20px",
      position: "absolute",
      top: "50%",

      "@media (max-width: 768px)": {
        bottom: "-12px",
        fontSize: "12px"
      },

      "@media (max-width: 1024px)": {
        bottom: "-18px",
        fontSize: "16px"
      }
    },
    yin: {
      color: "#4CD8CE"
    },
    yang: {
      color: "#F43082"
    },
    buttonContainer: {
      margin: "23px 0 0 0",

      "@media (min-width: 768px)": {
        display: "none"
      }
    }
  });
