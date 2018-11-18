import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { ICON } from "../../constants";
import LinksDesktop from "./links/desktop";
import LinksMobile from "./links/mobile";

/**
 * The application footer component. Contains page links. Displays either
 * a responsive horizontal menu or a dropdown vertical menu with a 'hamburger'
 * button depending on the application's current window size
 *
 * Children:
 * * `<LinksDesktop>`
 * * `<LinksMobile>`
 */

class Header extends Component {
  componentDidMount() {
    const { history } = this.props;
    history.listen(location => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div name="header" className={css(styles.headerContainer)}>
        <div name="linksContainer" className={css(styles.linksContainer)}>
          <Link to={"/"}>
            <div name="logo" className={css(styles.logo)} tabIndex={1} />
          </Link>
          <div name="desktopLinks" className={css(styles.desktopLinks)}>
            <LinksDesktop topics={Header.topics} />
          </div>
          <div name="mobileLinks" className={css(styles.mobileLinks)}>
            <LinksMobile topics={Header.topics} />
          </div>
        </div>
      </div>
    );
  }

  static topics = [
    {
      text: "culture",
      route: "/culture"
    },
    {
      text: "politics",
      route: "/politics"
    },
    {
      text: "entertainment",
      route: "/entertainment"
    },
    {
      text: "sports",
      route: "/sports"
    },
    {
      text: "results",
      route: "/results"
    }
  ];
}

export default withRouter(Header);

Header.propTypes = {
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired
};

const styles = StyleSheet.create({
  headerContainer: {
    boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "100%",
    zIndex: "100",

    "@media (max-width: 768px)": {
      height: "60px"
    },

    "@media (min-width: 769px)": {
      height: "102px"
    }
  },
  linksContainer: {
    display: "flex",
    height: "100%",
    margin: "auto",
    width: "100%",

    "@media (min-width: 1240px)": {
      width: "1240px"
    }
  },
  logo: {
    backgroundImage: ICON.SECTION.TYLT_LOGO_BLACK,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    cursor: "pointer",
    margin: "0 0 0 20px",
    position: "absolute",
    top: "50%",

    "@media (max-width: 768px)": {
      width: "63px",
      height: "40px",
      left: "50%",
      margin: "0 0 0 30px",
      transform: "translate(-100%, -50%)"
    },

    "@media (min-width: 769px)": {
      width: "80px",
      height: "52px",
      transform: "translate(0%, -50%)"
    }
  },
  iconColor: {
    color: "inherit"
  },
  mobileLinks: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "block",
      width: "100%"
    }
  },
  desktopLinks: {
    display: "none",
    "@media (min-width: 769px)": {
      display: "block",
      width: "100%"
    }
  }
});
