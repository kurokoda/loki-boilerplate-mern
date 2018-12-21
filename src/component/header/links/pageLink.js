import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getIncrementedElementName } from '../../../utils/collection/index';
import { ApplicationContext } from '../../../context/application';

class PageLink extends Component {
  render() {
    const { children, onClick, route, location } = this.props;
    const { theme } = this.context;
    this.isActive = route.path === location.pathname;
    const classes = PageLink.getClasses({
      isActive: this.isActive,
      isHover: this.isHover,
      theme
    });

    return (
      <div
        key={getIncrementedElementName('desktopLink')}
        className={classes.link}
        onClick={onClick}
        role="link"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }
}

export default withRouter(PageLink);

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.shape({}).isRequired
};

PageLink.getClasses = config => {
  const styles = PageLink.getStyles(config);

  const { isActive, isHover } = config;
  return {
    link: css(
      isHover
        ? [styles.link, styles.linkHover]
        : isActive
          ? [styles.link, styles.linkActive]
          : styles.link
    ),
    page: css(styles.page)
  };
};

PageLink.getStyles = config =>
  StyleSheet.create({
    link: {
      color: config.theme.getIn(['header', 'color', 'pageLink']),
      cursor: 'pointer',
      display: 'inline-block',
      fontFamily: 'Open Sans',
      outline: 'none',
      textDecoration: 'none !important',
      fontWeight: '400',
      margin: '0 20px 0 0',
      transition: 'color 3s ease',

      ':hover': {
        color: config.theme.getIn(['header', 'color', 'pageLinkHover'])
      },

      '@media (max-width: 768px)': {
        margin: '0 5px 0 0'
      }
    },
    linkActive: {
      color: config.theme.getIn(['header', 'color', 'pageLinkActive'])
    }
  });

PageLink.contextType = ApplicationContext;
