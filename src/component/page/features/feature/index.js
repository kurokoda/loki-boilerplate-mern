/** @module Feature */

import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import style from '../../../../theme/dark';
import { ApplicationContext } from '../../../../context/application';

class Feature extends Component {
  static contextType = ApplicationContext;

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { feature } = this.props;
    const { theme } = this.context;

    const name = feature.get('name');
    const slug = feature.get('id');
    const implemented = feature.get('implemented');

    const classes = Feature.getClasses({ theme, implemented });

    return <div className={classes.container}>{name}</div>;
  }
}

Feature.getClasses = config => {
  const styles = Feature.getStyles(config);

  return {
    container: css(styles.container)
  };
};

Feature.propTypes = {
  /** Component data */
  feature: ImmutablePropTypes.map.isRequired
};

/**
 * Dynamically generates styles
 * @methodof Feature
 * @returns {object} The class's styles
 */
Feature.getStyles = config =>
  StyleSheet.create({
    container: {
      borderRadius: '8px',
      backgroundColor: config.implemented
        ? config.theme.getIn(['feature', 'color', 'activeBackground'])
        : config.theme.getIn(['feature', 'color', 'inactiveBackground']),
      color: config.theme.getIn(['feature', 'color', 'text']),
      minHeight: '40px',
      padding: '10px 10px 10px 10px',
      margin: '10px 10px 10px 10px',
      textDecoration: 'none'
    }
  });

export default withRouter(Feature);
