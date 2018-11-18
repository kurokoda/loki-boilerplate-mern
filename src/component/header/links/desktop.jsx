import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { getIncrementedElementName } from "../../../utils/collection";

/**
 * A responsive horizontal menu for navigating the application's pages
 */
class LinksDesktop extends Component {
  render() {
    const { topics } = this.props;
    return (
      <div className={css(styles.links)}>
        {topics.map(item => (
          <div
            key={getIncrementedElementName("desktopLink")}
            className={css(styles.page)}
            role="link"
            tabIndex={0}
          >
            <NavLink
              to={item.route}
              activeClassName={css(styles.activeLink)}
              className={css(styles.link)}
            >
              {item.text.toUpperCase()}
            </NavLink>
          </div>
        ))}
        <div className={css(styles.socialMediaIconContainer)}>
          <a
            href="http://www.facebook.com/TheTylt/"
            className={css(styles.iconColor)}
          >
            <i className="fab fa-facebook" />
          </a>
          <a
            href="http://twitter.com/TheTylt"
            className={css(styles.iconColor)}
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="http://www.instagram.com/thetylt/"
            className={css(styles.iconColor)}
          >
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
    );
  }
}

LinksDesktop.propTypes = {
  /** The application page configs */
  topics: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default withRouter(LinksDesktop);

const styles = StyleSheet.create({
  links: {
    fontSize: "16px",
    letterSpacing: "0.6px",
    margin: "20px 0 0 140px",
    position: "relative",
    zIndex: "10000"
  },
  linksContainer: {
    position: "absolute",
    zIndex: "1000"
  },
  page: {
    color: "#000000,",
    display: "inline-block",
    fontWeight: "400",
    height: "30px",
    margin: "18px 20px 0 0",

    "@media (max-width: 880px)": {
      margin: "18px 5px 0 0"
    }
  },
  link: {
    color: "inherit",
    fontFamily: "Open Sans",
    padding: "5px",

    ":hover": {
      backgroundImage: "linear-gradient(to right, #686bc7, #00f7a5)",
      color: "#FFFFFF",
      height: "30px",
      width: "138px",
      textDecoration: "none"
    }
  },
  activeLink: {
    backgroundImage: "linear-gradient(to right, #686bc7, #00f7a5)",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 6px",
    color: "inherit !important",
    display: "inline",
    fontWeight: "bold",
    textDecoration: "none !important"
  },
  socialMediaIconContainer: {
    display: "flex",
    fontSize: "25px",
    height: "100%",
    justifyContent: "space-around",
    margin: "-30px 0 0 auto",
    width: "140px"
  },
  iconColor: {
    color: "inherit"
  }
});
