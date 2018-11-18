import { css, StyleSheet } from "aphrodite/no-important";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { getIncrementedElementName } from "../../../utils/collection";

/**
 * A dropdown vertical menu with a 'hamburger' button for navigating the
 * application's pages
 *
 * @returns {xml} The LinksMobile component
 */
class LinksMobile extends Component {
  state = {
    isOpen: false,
    currentLocation: null
  };

  componentDidMount() {
    this.initRouteChangeListener();
  }

  componentWillUnmount() {
    this.routeChangeListenerDismiss();
  }

  render() {
    const { topics } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      return (
        <div className={css(styles.mobileWidth)} role="banner">
          <div
            className={css(styles.button)}
            onClick={this.onNavMenuButtonClick}
            onKeyDown={this.onNavHeaderClick}
            role="presentation"
          >
            &#10005;
          </div>
          <div className={css(styles.links)}>
            {topics.map(item => (
              <div
                className={css(styles.page)}
                key={getIncrementedElementName("mobileLink")}
                onClick={this.onNavLinkClick}
                onKeyDown={this.onNavLinkClick}
                role="link"
                tabIndex={0}
              >
                <Link
                  className={css(styles.link)}
                  activeStyle={css(styles.activeLink)}
                  to={item.route}
                >
                  {item.text.toUpperCase()}
                </Link>
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
        </div>
      );
    }
    return (
      <div className={css(styles.mobile)}>
        <div
          className={css(styles.button)}
          onClick={this.onNavMenuButtonClick}
          onKeyDown={this.onNavLinkClick}
          role="link"
          tabIndex={0}
        >
          &#9776;
        </div>
      </div>
    );
  }

  initRouteChangeListener() {
    const { history } = this.props;
    const { currentLocation } = this.state;

    this.routeChangeListenerDismiss = history.listen(location => {
      if (currentLocation && currentLocation !== location) {
        this.setState({ isOpen: false });
      }
      this.setState({ currentLocation, isOpen: false });
    });
  }

  toggleIsOpen = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onNavMenuButtonClick = () => {
    this.toggleIsOpen();
  };
}

LinksMobile.propTypes = {
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired,
  /** The application page configs */
  topics: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default withRouter(LinksMobile);

const styles = StyleSheet.create({
  links: {
    backgroundColor: "#ffffff",
    margin: "60px 0 0 0",
    position: "absolute",
    width: "100%",
    zIndex: "10000"
  },
  button: {
    color: "#000000",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "35px",
    margin: "0 24px 0 0px",
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)"
  },
  linksContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    top: "70px",
    width: "100%",
    zIndex: "1000"
  },
  page: {
    color: "#000000,",
    height: "30px",
    display: "block",
    fontWeight: "400",
    fontSize: "24px",
    margin: "18px 0 0 0",
    textAlign: "center",
    textShadow: "0 0 5px #FFFFFF"
  },
  link: {
    color: "#000000",
    fontFamily: "Open Sans",

    ":hover": {
      textDecoration: "none"
    }
  },
  activeLink: {
    fontWeight: "bold"
  },
  socialMediaIconContainer: {
    alignContent: "bottom",
    alignItems: "center",
    display: "flex",
    height: "40vh",
    fontSize: "50px",
    justifyContent: "space-around",
    margin: "30px auto",
    width: "210px"
  },
  iconColor: {
    color: "inherit"
  },
  mobileWidth: {
    width: "inherit"
  }
});
