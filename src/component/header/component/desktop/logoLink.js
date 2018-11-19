import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../../assets/images/logo/index';

const LogoLink = ({ callback }) => {
  const classes = LogoLink.getClasses();
  return (
    <div
      id="header__links-container-logo-container"
      className={classes.logoContainer}
      onClick={callback}
      onKeyDown={callback}
      role="link"
      tabIndex={0}
    >
      <Logo size={50} />
    </div>
  );
};

export default LogoLink;

LogoLink.propTypes = {
  callback: PropTypes.func.isRequired
};

LogoLink.getClasses = config => {
  const styles = LogoLink.getStyles(config);

  return {
    logoContainer: css(styles.logoContainer)
  };
};

LogoLink.getStyles = () =>
  StyleSheet.create({
    logoContainer: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',

      '@media (max-width: 768px)': {
        margin: '0 10px 0 10px'
      },

      '@media (min-width: 769px)': {
        margin: '0 20px 0 20px'
      }
    }
  });
