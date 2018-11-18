import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ICON from "../../constants/icon";
import { getIncrementedElementName } from "../../utils/collection";
import { InteractiveButton } from "../button";
import TopicCollapsed from "../tile/TopicCollapsed";
import TopicExpanded from "../tile/TopicExpanded";

class Topic extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const { config, layout, analyticsCallArticleLinkAction } = this.props;
    const articles = config.get("articles");
    const topic = config.get("topic");
    const topicLowercase = config.get("topic").toLowerCase();
    const topicRoute = `/${topicLowercase}`;
    let primaryArticle;
    let secondaryArticles;
    if (layout !== "expanded") {
      primaryArticle = articles.get("0");
      secondaryArticles = articles.slice(1);
    }

    return (
      <Fragment>
        {layout === "expanded" ? (
          <div name="topicSection" className={css(stylesExpanded.topicSection)}>
            <div name="header" className={css(stylesExpanded.header)}>
              <div name="topic" className={css(stylesExpanded.topic)}>
                <Link to={topicRoute}>
                  <div
                    name="icon"
                    className={css([
                      stylesExpanded.icon,
                      stylesExpanded[topic.toLowerCase()]
                    ])}
                  />
                  <span className={css(stylesExpanded.category)}>{topic}</span>
                </Link>
              </div>
              <div
                name="buttonContainer"
                className={css([
                  stylesExpanded.buttonContainer,
                  stylesExpanded.viewAllText
                ])}
              >
                <InteractiveButton
                  theme="white"
                  route={topic.toLowerCase()}
                  text="VIEW ALL"
                />
              </div>
            </div>
            <hr
              name="horizontalDivider"
              className={css(stylesExpanded.horizontalDivider)}
            />
            <div name="body" id="body" className={css(stylesExpanded.body)}>
              {articles.map((article, index) => (
                <div
                  name="column"
                  key={getIncrementedElementName("article")}
                  className={css(stylesExpanded.column)}
                >
                  <TopicExpanded
                    config={article}
                    analyticsCallArticleLinkAction={
                      analyticsCallArticleLinkAction
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div name="header" className={css(stylesCollapsed.header)}>
              <div name="topic" className={css(stylesCollapsed.topic)}>
                <Link to={topicRoute}>
                  <div
                    name="icon"
                    className={css([
                      stylesCollapsed.icon,
                      stylesCollapsed[topic.toLowerCase()]
                    ])}
                  />
                  <span className={css(stylesCollapsed.category)}>{topic}</span>
                </Link>
              </div>
            </div>
            <div name="body" id="body" className={css(stylesCollapsed.body)}>
              <div name="column" className={css(stylesCollapsed.column)}>
                <TopicExpanded
                  config={primaryArticle}
                  analyticsCallArticleLinkAction={
                    analyticsCallArticleLinkAction
                  }
                />
              </div>
              {secondaryArticles.map((article, index) => (
                <div
                  column="title"
                  key={getIncrementedElementName("secondaryArticle")}
                  className={css(stylesCollapsed.column)}
                >
                  <TopicCollapsed
                    config={article}
                    analyticsCallArticleLinkAction={
                      analyticsCallArticleLinkAction
                    }
                  />
                </div>
              ))}
              <InteractiveButton
                theme="white"
                route={topic.toLowerCase()}
                text="VIEW ALL"
              />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

Topic.propTypes = {
  config: ImmutablePropTypes.map.isRequired,
  layout: PropTypes.string.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

export default withRouter(Topic);

// Styles -----------------------------
const stylesExpanded = StyleSheet.create({
  body: {
    display: "inline-flex",
    margin: "0 0 20px -20px"
  },
  category: {
    color: "#000000",
    textDecoration: "none"
  },
  column: {
    margin: "0 0 0 20px"
  },
  buttonContainer: {
    float: "right",
    padding: "15px 0 0 0"
  },
  culture: {
    backgroundImage: ICON.SECTION.CULTURE
  },
  entertainment: {
    backgroundImage: ICON.SECTION.ENTERTAINMENT
  },
  header: {
    width: "100%",
    margin: "40px 0 0 0"
  },
  horizontalDivider: {
    backgroundColor: "#979797",
    height: "1px",
    margin: "-1px 0 20px 0",
    maxWidth: "1240px"
  },
  icon: {
    display: "inline-block",
    margin: "0 10px -7px 0",
    width: "50px",
    height: "50px",
    backgroundSize: "100%"
  },
  politics: {
    backgroundImage: ICON.SECTION.POLITICS
  },
  sports: {
    backgroundImage: ICON.SECTION.SPORTS
  },
  topic: {
    color: "#000000",
    display: "inline-block",
    fontSize: "50px",
    fontWeight: "700"
  },
  topicSection: {
    margin: "40px 0 0 0"
  },
  viewAllText: {
    fontSize: "16px"
  }
});

const stylesCollapsed = StyleSheet.create({
  body: {
    display: "inline-flex",
    margin: "auto",
    flexWrap: "wrap",

    "@media (max-width: 480px)": {
      display: "block"
    }
  },
  buttonContainer: {
    height: "80px",
    width: "100%"
  },
  category: {
    color: "#000000",
    textDecoration: "none"
  },
  column: {
    margin: "auto",

    "@media (max-width: 768px)": {
      width: "100%"
    }
  },
  sports: {
    backgroundImage: ICON.SECTION.SPORTS
  },
  culture: {
    backgroundImage: ICON.SECTION.CULTURE
  },
  politics: {
    backgroundImage: ICON.SECTION.POLITICS
  },
  entertainment: {
    backgroundImage: ICON.SECTION.ENTERTAINMENT
  },
  header: {
    width: "100%",
    margin: "40px 0 0 0"
  },
  horizontalDivider: {
    backgroundColor: "#979797",
    height: "1px",
    marginTop: "-1px",
    maxWidth: "1240px"
  },
  icon: {
    display: "inline-block",
    margin: "0 10px -7px 0",
    width: "40px",
    height: "40px",
    backgroundSize: "100%"
  },
  topic: {
    color: "#000000",
    display: "inline-block",
    fontSize: "35px",
    fontWeight: "700"
  }
});
