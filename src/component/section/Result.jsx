import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ICON from "../../constants/icon";
import { getIncrementedElementName } from "../../utils/collection";
import { InteractiveButton } from "../button";
import ResultArticle from "../tile/Result";
import { ROUTE as ROUTE_REGEX } from "../../constants/regex";

class Result extends Component {
  state = {
    width: window.innerWidth
  };

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.forceUpdate();
  }

  render() {
    const { config, viewAll, analyticsCallArticleLinkAction } = this.props;
    const pathname = window.location.pathname;
    const isResultsRoute = ROUTE_REGEX.RESULTS_PAGE.test(pathname);
    const resultsRoute = "/results";

    return (
      <div name="resultSection">
        <div
          name="header"
          className={
            isResultsRoute && this.state.width <= 768
              ? css(styles.headerResultsPageMobile)
              : css(styles.header)
          }
        >
          <div
            name="topic"
            className={
              isResultsRoute && this.state.width <= 768
                ? css(styles.topicResultsPageMobile)
                : css(styles.topic)
            }
          >
            <Link to={resultsRoute}>
              <div
                name="icon"
                className={
                  isResultsRoute && this.state.width <= 768
                    ? css([styles.iconResultsPageMobile, styles.results])
                    : css([styles.icon, styles.results])
                }
              />
              <span className={css(styles.headerText)}>Results</span>
            </Link>
          </div>
          {viewAll && (
            <div name="buttonContainer" className={css(styles.buttonContainer)}>
              <InteractiveButton
                theme="white"
                text="VIEW ALL"
                route={"/results"}
              />
            </div>
          )}
        </div>
        <hr
          name="horizontalDivider"
          className={css(styles.horizontalDivider)}
        />
        <div name="content" className={css(styles.content)}>
          {config.map((article, index) => (
            <div
              name="article"
              key={getIncrementedElementName("article")}
              className={css(styles.article)}
            >
              <ResultArticle
                config={article}
                analyticsCallArticleLinkAction={analyticsCallArticleLinkAction}
              />
            </div>
          ))}
          {this.state.width <= 768 && (
            <InteractiveButton
              theme="white"
              text="VIEW ALL"
              route={"/results"}
            />
          )}
        </div>
      </div>
    );
  }

  onResize = () => {
    this.setState({ width: window.innerWidth });
  };
}

Result.propTypes = {
  config: ImmutablePropTypes.list.isRequired,
  viewAll: PropTypes.bool,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

Result.defaultProps = {
  viewAll: false
};

export default withRouter(Result);

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px 0 20px -20px",
    boxSizing: "border-box"
  },
  article: {
    margin: "0 0 20px 0",
    width: "50%",

    "@media (max-width: 768px)": {
      width: "100%"
    }
  },
  buttonContainer: {
    float: "right",
    padding: "15px 0 0 0",

    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  header: {
    margin: "40px 0px 0px",
    width: "100%"
  },
  headerResultsPageMobile: {
    width: "100%"
  },
  headerResultsPageMobile: {
    width: "100%"
  },
  headerText: {
    color: "#000000",
    textDecoration: "none"
  },
  topic: {
    color: "#000000",
    display: "inline-block",
    fontSize: "50px",
    fontWeight: "700",

    "@media (max-width: 768px)": {
      fontSize: "35px"
    }
  },
  topicResults: {
    color: "#000000",
    display: "inline-block",
    fontSize: "50px",
    fontWeight: "700",

    "@media (max-width: 768px)": {
      fontSize: "35px"
    }
  },
  topicResultsPageMobile: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "50px",
    fontWeight: "700"
  },
  horizontalDivider: {
    backgroundColor: "#979797",
    height: "1px",
    marginTop: "-2px",
    maxWidth: "1240px",
    width: "100%",

    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  icon: {
    backgroundSize: "100%",
    display: "inline-block",
    height: "50px",
    margin: "0px 10px -7px 0px",
    width: "50px",

    "@media (max-width: 768px)": {
      height: "40px",
      width: "40px"
    }
  },
  iconResultsPageMobile: {
    backgroundSize: "100%",
    height: "70px",
    margin: "auto",
    width: "70px"
  },
  results: {
    backgroundImage: ICON.SECTION.RESULTS
  }
});
