import { css, StyleSheet } from "aphrodite/no-important";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import Button from "./button";

class AffiliateLink extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    const onClick = this.onClick.bind(this);
    const { article, vote } = this.props;
    const classes = AffiliateLink.getClasses();
    const isAmazon = Boolean(article.get("amazonAffiliateData"));

    const messageText = isAmazon
      ? article.getIn(["amazonAffiliateData", `${vote}ProductMessageText`])
      : article.getIn(["affiliateData", "messageText"]);
    const buttonText = isAmazon
      ? article.getIn(["amazonAffiliateData", `${vote}ProductButtonText`])
      : article.getIn(["affiliateData", "buttonText"]);

    return (
      <div name="affiliateLink" className={classes.container}>
        <div name="affiliateLinkText" className={classes.text}>
          {messageText}
        </div>
        <Button onClick={onClick}> {buttonText}</Button>
      </div>
    );
  }

  onClick = () => {
    const { article, vote } = this.props;

    const isAmazon = Boolean(article.get("amazonAffiliateData"));

    const targetUrl = isAmazon
        ? article.getIn(["amazonAffiliateData", `${vote}ProductUrl`])
        : article.getIn(["affiliateData", "targetURL"]);

    window.open(targetUrl, "_blank");
  };
}

AffiliateLink.getClasses = () => {
  const styles = AffiliateLink.getStyles();

  return {
    container: css(styles.container),
    button: css(styles.button),
    text: css(styles.text)
  };
};

AffiliateLink.propTypes = {
  article: ImmutablePropTypes.map.isRequired,
  vote: PropTypes.string.isRequired
};

AffiliateLink.getStyles = () =>
  StyleSheet.create({
    container: {
      height: "100px",
      textAlign: "center"
    },
    text: {
      margin: "20px 0 20px 0",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    button: {}
  });

export default AffiliateLink;
