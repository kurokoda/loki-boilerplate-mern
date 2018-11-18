import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImmutablePropTypes from "react-immutable-proptypes";
import ReactRouterPropTypes from "react-router-prop-types";
import { formatArticleSrcSetForTile } from "../../utils/article";

// Exports -----------------------------

class TopicCollapsed extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { config } = this.props;
    const title = config.get("title");
    const defaultImageURL = config.get("imgSrcGrid");
    const imageURLs = formatArticleSrcSetForTile(config.get("srcSetGrid"));
    const onClick = this.onClick;
    const styles = TopicCollapsed.getStyles();
    const slug = config.get("slug");
    const topic = config.get("topic").toLowerCase();
    const articleRoute = `/${topic}/${slug}`;

    return (
      <Link to={articleRoute}>
        <div
          name="topicTile"
          className={css(styles.topicTile)}
          onClick={onClick}
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
          <div name="title" className={css(styles.title)}>
            {title}
          </div>
        </div>
      </Link>
    );
  }

  onClick = () => {
    const { analyticsCallArticleLinkAction } = this.props;

    analyticsCallArticleLinkAction();
  };
}

export default TopicCollapsed;

TopicCollapsed.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

// Styles -----------------------------

TopicCollapsed.getStyles = config =>
  StyleSheet.create({
    image: {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      display: "inline-block",
      height: "100px"
    },
    topicTile: {
      display: "flex",
      height: "100px",
      margin: "0 0 20px 0"
    },
    title: {
      color: "#000000",
      display: "inline-block",
      fontSize: "14px",
      fontWeight: "700",
      margin: "0 0 0 20px",
      textDecoration: "none",

      "@media (max-width: 350px)": {
        fontSize: "12px"
      }
    }
  });
