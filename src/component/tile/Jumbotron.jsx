import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { blackTapeText } from "../../utils/style/index";
import { getIncrementedElementName } from "../../utils/collection";

// Exports -----------------------------

class Jumbotron extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { classes } = this;
    const { config, layout } = this.props;
    const title = blackTapeText(config.get("title"));
    const doShowTopic = layout === "expanded";
    const srcSet = layout === "expanded" ? "srcSetHero" : "srcSetGrid";
    const srcImg = layout === "expanded" ? "imgSrcHero" : "imgSrcGrid";
    const topic = config.get("topic");
    const slug = config.get("slug");
    const topicLowercase = config.get("topic").toLowerCase();
    const route = `/${topicLowercase}/${slug}`;
    const topicRoute = `/${topicLowercase}`;

    return (
      <div
        name="jumbotronArticle"
        className={classes.jumbotronArticle}
        role="link"
        tabIndex={0}
      >
        <Link onClick={this.onClickAnalyticAction} to={route}>
          <picture>
            {this.getImageSources(srcSet)}
            <img
              name="image"
              className={classes.image}
              alt={config.get("title")}
              src={config.get(srcImg)}
            />
            <div name="overlay" className={classes.overlay}>
              <div
                name="overlayBackground"
                className={classes.overlayBackground}
              />
            </div>
          </picture>
        </Link>
        <div name="titleContainer" className={classes.titleContainer}>
          {doShowTopic && (
            <Link to={topicRoute}>
              <div className={classes.topic}>{topic}</div>
            </Link>
          )}
          <Link onClick={this.onClickAnalyticAction} to={route}>
            <div
              className={classes.title}
              ref={titleRef => {
                this.titleRef = titleRef;
              }}
              role="link"
              tabIndex={0}
            >
              {title}
            </div>
          </Link>
        </div>
      </div>
    );
  }

  onClickAnalyticAction = () => {
    const { analyticsCallArticleLinkAction } = this.props;
    analyticsCallArticleLinkAction();
  };

  getSrcSetArray(src) {
    return this.props.config
      .get(src)
      .toArray()
      .reverse();
  }

  getMinWidths(src) {
    const { config } = this.props;
    const widths = Object.keys(config.get(src).toJS());
    return widths.map(width => parseInt(width.replace(/\D/g, ""), 10));
  }

  getImageSources(src) {
    const minWidths = this.getMinWidths(src);
    return this.getSrcSetArray(src).map((srcSet, index) => (
      <source
        key={getIncrementedElementName("source")}
        data-srcset={srcSet}
        srcSet={srcSet}
        media={`(min-width: ${minWidths[index]}px)`}
      />
    ));
  }

  // getters -----------------------------

  get classes() {
    const { layout } = this.props;
    const styles = Jumbotron.getStyles({ titleRef: this.titleRef });

    return {
      image: css(styles.image),
      jumbotronArticle: css(styles.jumbotronArticle),
      topic: css([
        styles.topic,
        layout === "expanded" ? styles.topicExpanded : styles.topicCollapsed
      ]),
      title: css([
        styles.title,
        layout === "expanded" ? styles.titleExpanded : styles.titleCollapsed
      ]),
      titleContainer: css([
        styles.titleContainer,
        layout === "expanded"
          ? styles.titleContainerExpanded
          : styles.titleContainerCollapsed
      ]),
      overlay: css(styles.overlay),
      overlayBackground: css(styles.overlayBackground)
    };
  }
}

// PropTypes -----------------------------

Jumbotron.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  layout: PropTypes.string.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

// Styles -----------------------------

Jumbotron.getStyles = config => {
  const titleHeightOffset = config.titleRef
    ? config.titleRef.clientHeight / 2
    : 0;

  return StyleSheet.create({
    image: {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "100%"
    },
    jumbotronArticle: {
      margin: "auto",
      position: "relative",
      cursor: "pointer"
    },
    topic: {
      backgroundColor: "white",
      color: "#000000",
      display: "inline-block",
      fontFamily: "Avenir Next",
      fontWeight: "500",
      margin: "0 0 20px 0",
      padding: "2px 5px 2px 5px",
      textDecoration: "none"
    },
    topicCollapsed: {
      fontSize: "18px"
    },
    topicExpanded: {
      fontSize: "20px",
      position: "relative"
    },
    title: {
      margin: "0 0 0 7px",
      color: "white"
    },
    titleCollapsed: {
      fontFamily: "Avenir Next Bold",
      fontSize: "25px",
      margin: "0 0 -10px 0",
      width: "90%"
    },
    titleExpanded: {
      fontSize: "45px",
      fontFamily: "Avenir Next",
      position: "relative",
      width: "90%",

      "@media (min-width: 768px) and (max-width: 1164px)": {
        fontSize: "35px"
      },

      "@media (max-width: 768px)": {
        fontSize: "25px"
      }
    },
    titleContainer: {
      position: "absolute",
      width: "90%"
    },
    titleContainerCollapsed: {
      bottom: `-${titleHeightOffset}px`,
      margin: "0 20px",
      maxWidth: "1240px"
    },
    titleContainerExpanded: {
      bottom: "-24px",

      "@media (max-width: 768px)": {
        bottom: "-18px",
        margin: "0 0 10px 0"
      },

      "@media (max-width: 1300px)": {
        margin: "0 20px"
      },

      "@media (min-width: 1300px)": {
        margin: "0 0 10px 70px",
        maxWidth: "1240px"
      }
    },
    overlay: {
      cursor: "pointer",
      width: "100%",
      height: "100%",
      top: "0",
      opacity: "0.0",
      position: "absolute",
      transition: "opacity 0.5s",
      ":hover": {
        opacity: "1.0"
      }
    },
    overlayBackground: {
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.65))",
      width: "100%",
      height: "100%",
      top: "-5px",
      position: "absolute"
    }
  });
};

export default withRouter(Jumbotron);
