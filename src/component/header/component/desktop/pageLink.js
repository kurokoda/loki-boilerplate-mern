import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIncrementedElementName } from '../../../../utils/collection/index';
import { ApplicationContext } from '../../../../context/application';

class PageLink extends Component {
  static contextType = ApplicationContext;

  render() {
    const { callback, children, route } = this.props;
    const { theme } = this.context;
    const classes = PageLink.getClasses({ theme });
    return (
      <div
        key={getIncrementedElementName('desktopLink')}
        className={classes.page}
        role="link"
        tabIndex={0}
      >
        <div
          className={[classes.link, classes.activeLink]}
          key={route.type}
          onClick={callback}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default PageLink;

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.shape({}).isRequired
};

PageLink.getClasses = config => {
  const styles = PageLink.getStyles(config);

  return {
    link: css(styles.link),
    page: css(styles.page)
  };
};

PageLink.getStyles = config =>
  StyleSheet.create({
    link: {
      cursor: 'pointer',
      fontFamily: 'Open Sans',
      margin: '22px 0 0 0',
      outline: 'none',
      padding: '14px 5px 5px 5px',
      textDecoration: 'none !important'
    },
    page: {
      color: config.theme.getIn(['header', 'color', 'pageLink']),
      display: 'inline-block',
      fontWeight: '400',
      margin: '0 20px 0 0',

      '@media (max-width: 768px)': {
        margin: '0 5px 0 0'
      }
    }
  });
