import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class ArticleSynopsis extends PureComponent {
  render() {
    const __html = this.props.articleSynopsis;
    const classes = ArticleSynopsis.getClasses();

    return (
      <div
        className={classes.articleSynopsis}
        dangerouslySetInnerHTML={{ __html }}
      />
    );
  }
}

ArticleSynopsis.getClasses = () => {
  const styles = ArticleSynopsis.getStyles();

  return {
    articleSynopsis: css(styles.articleSynopsis)
  };
};

ArticleSynopsis.getStyles = () =>
  StyleSheet.create({
    articleSynopsis: {
      fontFamily: "Zilla Slab",
      fontSize: "18px",
      lineHeight: "30px",
      margin: "40px 0 14px 0",

      "@media (max-width: 768px)": {
        fontSize: "18px",
        padding: "20px"
      }
    }
  });

ArticleSynopsis.propTypes = {
  articleSynopsis: PropTypes.string.isRequired
};

export default ArticleSynopsis;
