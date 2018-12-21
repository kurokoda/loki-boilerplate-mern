/** @module Well */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ApplicationContext } from '../../context/application';

class Well extends Component {
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
    const classes = Well.getClasses({ theme });
    const { children } = this.props;

    return (
      <Fragment>
        <div className={classes.container}>{children}</div>
      </Fragment>
    );
  }
}

Well.getClasses = config => {
  const styles = Well.getStyles(config);

  return {
    container: css(styles.container),
    name: css(styles.name)
  };
};

Well.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Dynamically generates styles
 * @methodof Well
 * @returns {object} The class's styles
 */
Well.getStyles = config =>
  StyleSheet.create({
    container: {
      backgroundImage: config.theme.getIn(['well', 'color', 'backgroundImage']),
      border: `1px solid ${config.theme.getIn(['well', 'color', 'border'])}`,
      borderRadius: '8px',
      boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.2)',
      margin: '0 0 40px 0',
      padding: '20px 20px 0px 20px'
    },
    name: {
      margin: '10px 10px 10px'
    }
  });

export default withRouter(Well);

Well.contextType = ApplicationContext;
