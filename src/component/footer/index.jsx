import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Logo from '../../assets/images/logo';
import CONFIG from '../../config';
import { ApplicationContext } from '../../context/application';

/**
 * The application footer component. Contains links and legal information
 */

class Footer extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { theme } = this.context;

    return (
      <div id="footer" className={css(styles.footer)}>
        <div id="footer__logo-container" className={css(styles.container)}>
          <div className={css(styles.socialContainer)}>
            <Logo
              foreground={theme.getIn(['app', 'color', 'logo'])}
              background={theme.getIn(['footer', 'color', 'background'])}
              size={50}
            />
            <div
              id="footer__logo-container__socialMediaIcons"
              className={css(styles.socialMediaIconContainer)}
            >
              <a
                className={css(styles.contentColor)}
                href={CONFIG.SOCIAL.FACEBOOK}
                id="footer__logo-container__socialMediaIcons-facebook"
              >
                <i className="fab fa-facebook" />
              </a>
              <a
                className={css(styles.contentColor)}
                href={CONFIG.SOCIAL.TWITTER}
                id="footer__logo-container__socialMediaIcons-twitter"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className={css(styles.contentColor)}
                href={CONFIG.SOCIAL.INSTAGRAM}
                id="footer__logo-container__socialMediaIcons-instagram"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            {CONFIG.COMPANY.COPYRIGHT}
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            Use of and/or registration on any portion of this site constitutes
            acceptance of our &nbsp;
            <a href={CONFIG.EXTERNAL_URL.USER_AGREEMENT}>User Agreement</a>
            &nbsp; (updated 5/25/18) and &nbsp;
            <a href={CONFIG.EXTERNAL_URL.PRIVACY_POLICY}>
              Privacy Policy and Cookie Statement &nbsp;
            </a>
            (updated 05/25/18).
          </div>
          <div className={css([styles.content, styles.contentColor])}>
            {`© 2018 ${CONFIG.COMPANY.NAME.LEGAL} All rights reserved `}
            <a href={CONFIG.EXTERNAL_URL.ABOUT_US}>About Us</a>
            .
            <br />
            <br />
            The material on this site may not be reproduced,
            distributed,transmitted,cached or otherwise used, except with the
            prior written permission of
            {CONFIG.COMPANY.NAME.SIMPLE}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);

// TODO convert JS-in-CSS to CSS when possible

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    justifyContent: 'space-between',
    left: '0',
    margin: 'auto',
    maxWidth: '800px',
    position: 'absolute',
    right: '0',
    textAlign: 'center',
    top: '0',
    width: '100%',

    '@media (max-width: 768px)': {
      height: '400px'
    }
  },
  content: {
    fontFamily: 'Open Sans',
    fontSize: '10px',

    '@media (max-width: 768px)': {
      fontSize: '14px',
      padding: '5px',
      textAlign: 'center'
    }
  },
  contentColor: {
    color: '#ffffff;'
  },
  footer: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    height: '254px',
    margin: '75px 0 0 0',
    position: 'relative',

    '@media (max-width: 768px)': {
      height: '428px'
    }
  },
  socialContainer: {
    display: 'inline-block',
    width: '100px',

    '@media (max-width: 768px)': {
      margin: '30px auto 0px auto',
      width: '200px'
    }
  },
  socialMediaIconContainer: {
    display: 'flex',
    fontSize: '20px',
    justifyContent: 'space-between',
    margin: '10px 0 0 0',

    '@media (max-width: 768px)': {
      fontSize: '35px',
      margin: '12px'
    }
  }
});

Footer.contextType = ApplicationContext;
