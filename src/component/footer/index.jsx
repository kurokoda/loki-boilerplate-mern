import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { ICON } from "../../constants/index";

/**
 * The application footer component. Contains links and legal information
 */

class Footer extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate = () => true;

  render() {
    return (
      <div name="footer" className={css(styles.footer)}>
        <div name="logo" className={css(styles.container)}>
          <div className={css(styles.socialContainer)}>
            <div name="logo" className={css(styles.logo)} />
            <div
              name="socialMediaIcons"
              className={css(styles.socialMediaIconContainer)}
            >
              <a
                name="facebook"
                href="http://www.facebook.com/TheTylt/"
                className={css(styles.contentColor)}
              >
                <i className="fab fa-facebook" />
              </a>
              <a
                name="twitter"
                href="http://twitter.com/TheTylt"
                className={css(styles.contentColor)}
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                name="instagram"
                href="http://www.instagram.com/thetylt/"
                className={css(styles.contentColor)}
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            © 2016 The Tylt
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            Use of and/or registration on any portion of this site constitutes
            acceptance of our &nbsp;
            <a href="http://www.advance.net/advancelocalUserAgreement/user-agreement.html">
              User Agreement
            </a>
            &nbsp; (updated 5/25/18) and &nbsp;
            <a href="https://www.advance.net/advancelocalUserAgreement/privacy-policy.html">
              Privacy Policy and Cookie Statement &nbsp;
            </a>
            (updated 05/25/18).
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            © 2018 Advance Local Media LLC. All rights reserved
            <a href="https://www.advancelocal.com/about-us/">&nbsp; About Us</a>
            . The material on this site may not be reproduced,
            distributed,transmitted,cached or otherwise used, except with the
            prior written permission of Advance Local.
          </div>
          <a
            href="https://www.advance.net/advancelocalUserAgreement/privacy-policy.html#california_top/"
            className={css(styles.content)}
          >
            Your California Privacy Rights
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    height: "254px",
    margin: "75px 0 0 0",
    position: "relative",

    "@media (max-width: 768px)": {
      height: "428px"
    }
  },
  container: {
    alignItems: "center",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    height: "200px",
    justifyContent: "space-between",
    left: "0",
    margin: "auto",
    maxWidth: "700px",
    position: "absolute",
    right: "0",
    textAlign: "center",
    top: "0",
    width: "100%",

    "@media (max-width: 768px)": {
      height: "400px"
    }
  },
  socialContainer: {
    display: "inline-block",
    justifyContent: "space-between",
    width: "200px",

    "@media (max-width: 768px)": {
      display: "flex",
      margin: "30px auto 0px auto",
      width: "300px"
    }
  },
  socialMediaIconContainer: {
    display: "flex",
    fontSize: "20px",
    justifyContent: "space-between",
    margin: "10px 0 0 0",
    width: "100px",

    "@media (max-width: 768px)": {
      alignContent: "flex-end",
      fontSize: "35px",
      margin: "12px",
      width: "150px"
    }
  },
  logo: {
    backgroundImage: ICON.SECTION.TYLT_LOGO_WHITE,
    backgroundRepeat: "no-repeat",
    height: "47px",
    width: "75px",

    "@media (max-width: 768px)": {
      height: "60px",
      margin: "6px 0 0 0",
      width: "120px"
    }
  },
  content: {
    fontFamily: "Open Sans",
    fontSize: "10px",

    "@media (max-width: 768px)": {
      fontSize: "14px",
      padding: "5px",
      textAlign: "center"
    }
  },
  contentColor: {
    color: "#ffffff;"
  }
});
