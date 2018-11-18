import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { ICON } from "../../constants";
import { getIncrementedElementName } from "../../utils/collection";
import FeaturedArticle from "../tile/Featured";

// Exports -----------------------------

export default class FeaturedSection extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { config, mode, analyticsCallArticleLinkAction } = this.props;
    const styles = FeaturedSection.getStyles();

    return (
      <Fragment>
        {mode === "group" && (
          <div name="featuredSection" className={css(styles.featuredSection)}>
            {config.map((article, index) => (
              <FeaturedArticle
                key={getIncrementedElementName("article")}
                config={article}
                analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
              />
            ))}
          </div>
        )}
        {mode === "header" && (
          <div name="featuredSection" className={css(styles.featuredSection)}>
            <div name="topicHeader" className={css(styles.topicHeader)}>
              <div
                name="icon"
                className={css([
                  styles.icon,
                  styles[config.get("topic").toLowerCase()]
                ])}
              />
              <span>{config.get("topic")}</span>
              <span name="topStory" className={css(styles.topStory)}>
                Top Story
              </span>
            </div>
            <hr
              name="horizontalDivider"
              className={css(styles.horizontalDivider)}
            />
            <FeaturedArticle
              config={config}
              analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

FeaturedSection.propTypes = {
  config: PropTypes.oneOfType([ImmutablePropTypes.map, ImmutablePropTypes.list])
    .isRequired,
  mode: PropTypes.string.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

FeaturedSection.getStyles = () =>
  StyleSheet.create({
    icon: {
      display: "inline-block",
      margin: "10px 10px 0 0",
      width: "50px",
      height: "50px",
      backgroundSize: "100%",

      "@media (max-width: 768px)": {
        width: "70px",
        height: "70px"
      }
    },
    politics: {
      backgroundImage: ICON.SECTION.POLITICS
    },
    sports: {
      backgroundImage: ICON.SECTION.SPORTS
    },
    entertainment: {
      backgroundImage: ICON.SECTION.ENTERTAINMENT
    },
    culture: {
      backgroundImage: ICON.SECTION.CULTURE
    },
    topicHeader: {
      color: "#000000",
      display: "flex",
      fontSize: "50px",
      fontWeight: "700",

      "@media (max-width: 768px)": {
        flexDirection: "column",
        alignItems: "center"
      }
    },
    featuredSection: {
      maxWidth: `${window.innerWidth - 40}px`,
    },
    horizontalDivider: {
      backgroundColor: "#979797",
      height: "1px",
      margin: "-2px 0 30px 0",
      maxWidth: "1240px",
      width: "100%",

      "@media (max-width: 768px)": {
        display: "none"
      }
    },
    topStory: {
      marginLeft: "auto",

      "@media (max-width: 768px)": {
        display: "none"
      }
    }
  });
