import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { withRouter } from "react-router";
import ICON from "../../constants/icon";
import { chunkArray, getIncrementedElementName } from "../../utils/collection";
import GeneralTile from "../tile/General";

class GeneralSection extends Component {
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
    const { config, analyticsCallArticleLinkAction } = this.props;
    const articlesPerRow = 4;
    const articlesPerRowMobile = 2;
    const articles = config;
    const articlesMobile = articles.slice(0, articlesPerRow);
    const desktopRows = chunkArray(articles, articlesPerRow);
    const mobileRows = chunkArray(articlesMobile, articlesPerRowMobile);
    const rows = this.state.width <= 768 ? mobileRows : desktopRows;

    return (
      <div name="content" className={css(styles.content)}>
        <div name="topic" className={css(styles.topic)}>
          <div name="icon" className={css(styles.icon)} />
          <span>All Debates</span>
        </div>
        <hr
          name="horizontalDivider"
          className={css(styles.horizontalDivider)}
        />
        {rows.map(row => (
          <div
            name="row"
            key={getIncrementedElementName("row")}
            className={css(styles.row)}
          >
            {row.map(article => (
              <div
                name="article"
                key={getIncrementedElementName("article")}
                className={css(styles.article)}
              >
                <GeneralTile
                  config={article}
                  analyticsCallArticleLinkAction={
                    analyticsCallArticleLinkAction
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  onResize = () => {
    this.setState({ width: window.innerWidth });
  };
}

GeneralSection.propTypes = {
  config: ImmutablePropTypes.list.isRequired,
  analyticsCallArticleLinkAction: PropTypes.func.isRequired
};

export default withRouter(GeneralSection);

const styles = StyleSheet.create({
  content: {
    margin: "70px 0 0 0",

    "@media (max-width: 768px)": {
      margin: "50px 0 0 0"
    }
  },
  row: {
    display: "flex",
    margin: "0 0 20px 0"
  },
  article: {
    margin: "15px 10px 0 10px",

    "@media (min-width: 769px)": {
      width: "25%"
    },

    "@media (max-width: 480px)": {
      margin: "0 10px 0 10px",
      width: "50%"
    }
  },
  icon: {
    backgroundImage: ICON.SECTION.GENERAL,
    display: "inline-block",
    margin: "0 10px -7px 0",
    width: "50px",
    height: "50px",
    backgroundSize: "100%",

    "@media (max-width: 768px)": {
      width: "50px",
      height: "50px"
    }
  },
  horizontalDivider: {
    backgroundColor: "#979797",
    height: "1px",
    margin: "-2px 0 0 0",
    maxWidth: "1240px",
    width: "100%",

    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  topic: {
    color: "#000000",
    fontSize: "50px",
    fontWeight: "700",
    margin: "0 0 20px 0",

    "@media (max-width: 768px)": {
      fontSize: "35px",
      margin: "0px 0px 0px 10px !important"
    }
  }
});
