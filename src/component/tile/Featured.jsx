import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { formatArticleSrcSetForTile } from "../../utils/article";
import { blackTapeText } from "../../utils/style";
import { truncateText } from "../../utils/text";
import { InteractiveButton } from "../button";

class FeaturedTile extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { config } = this.props;
    const topic = config.get("topic");
    const defaultImageURL = config.get("imgSrcGrid");
    const imageURLs = formatArticleSrcSetForTile(config.get("srcSetGrid"));
    const title = blackTapeText(config.get("title"));
    const synopsis = truncateText(config.get("synopsis"), 415);
    const isHomePage = Boolean(window.location.pathname.match(/^\/$/));
    const slug = config.get("slug");
    const topicLowercase = config.get("topic").toLowerCase();
    const articleRoute = `/${topicLowercase}/${slug}`;
    const topicRoute = `/${topicLowercase}`;

    const styles = FeaturedTile.getStyles({ titleRef: this.titleRef });

    /* eslint-disable react/no-danger */
    return (
      <div name="featuredArticle" className={css(styles.featuredArticle)}>
        <div name="body" className={css(styles.body)}>
          <div
            name="columnOne"
            className={css([styles.column, styles.columnOne])}
          >
            <div name="content" className={css(styles.content)}>
              <img
                name="image"
                className={css(styles.image)}
                src={defaultImageURL}
                srcSet={imageURLs}
                alt={title}
                sizes="auto"
              />
              <div name="overlay" className={css(styles.overlay)}>
                <Link to={articleRoute}>
                  <div
                    name="overlayBackground"
                    className={css(styles.overlayBackground)}
                  />
                </Link>
                <div
                  name="buttonContainer"
                  className={css(styles.buttonContainer)}
                >
                  <InteractiveButton
                    theme="aqua"
                    text="VOTE NOW"
                    onClick={this.onClickAnalyticAction}
                    route={articleRoute}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            name="columnTwo"
            className={css([styles.column, styles.columnTwo])}
          >
            <div name="details" className={css(styles.details)}>
              {isHomePage ? (
                <Link to={topicRoute}>
                  <div name="topic" className={css(styles.topic)}>
                    {topic}
                  </div>
                </Link>
              ) : (
                <div className={css(styles.spacer)} />
              )}
            </div>
            <Link to={articleRoute}>
              <div
                name="title"
                ref={titleRef => {
                  this.titleRef = titleRef;
                }}
                className={css(styles.title)}
              >
                {title}
              </div>
            </Link>
            <div
              name="synopsis"
              className={`${css(styles.synopsis)}`}
              dangerouslySetInnerHTML={{ __html: synopsis }}
            />
          </div>
        </div>
      </div>
    );
  }

  onClickAnalyticAction = () => {
    const { analyticsCallArticleLinkAction } = this.props;
    analyticsCallArticleLinkAction();
  };
}

FeaturedTile.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

export default withRouter(FeaturedTile);

// Styles -----------------------------

FeaturedTile.getStyles = config =>
  StyleSheet.create({
    body: {
      display: "flex",
      flexWrap: "wrap",
      margin: "0 0 70px 0",

      "@media (max-width: 768px)": {
        display: "block"
      }
    },
    column: {
      flex: "1"
    },
    columnOne: {
      backgroundColor: "white"
    },
    columnTwo: {
      backgroundColor: "rgba(255, 255, 255, 0)" // rgba is so the box shadow is fully visible
    },
    content: {
      position: "relative"
    },
    overlay: {
      cursor: "pointer",
      width: "100%",
      top: "0",
      opacity: "0.0",
      position: "absolute",
      padding: "0 0 66.67% 0",
      transition: "opacity 0.5s",
      ":hover": {
        opacity: "1.0"
      }
    },
    overlayBackground: {
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.65))",
      width: "100%",
      top: "0",
      paddingBottom: "66.67%",
      position: "absolute"
    },
    buttonContainer: {
      position: "absolute",
      width: "100%",
      bottom: "20px"
    },
    image: {
      width: "100%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      zIndex: "2"
    },
    statuses: {
      float: "right"
    },
    synopsis: {
      color: "black",
      fontSize: "18px",
      fontFamily: "Zilla Slab",
      fontWeight: "500",
      fontKerning: "initial",
      margin: "25px 10px 10px 20px",
      textAlign: "justify",

      "@media (max-width: 768px)": {
        display: "none"
      }
    },
    title: {
      color: "white",
      fontFamily: "Avenir Next",
      fontSize: "35px",
      margin: "0 0 0 -20px",
      position: "relative",
      width: "85%",

      "@media (max-width: 730px)": {
        fontSize: "25px",
        margin: "-40px 0 0 20px"
      },

      "@media (min-width: 730px) and (max-width: 768px)": {
        margin: "-42px 0 0 20px",
        fontSize: "35px"
      },

      "@media (min-width: 768px) and (max-width: 977px)": {
        fontSize: "25px"
      },

      "@media (min-width: 977px) and (max-width: 1110px)": {
        fontSize: "35px"
      }
    },
    topic: {
      color: "black",
      display: "inline-block",
      fontFamily: "Avenir Next",
      fontSize: "20px",
      fontWeight: "500",
      margin: "10px 10px 10px 20px"
    },
    spacer: {
      margin: "30px 0 0 0"
    }
  });
