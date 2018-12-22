/** @module Category */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import Feature from '../feature';
import { ApplicationContext } from '../../../../context/application';

class Category extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { category, navigateToPage } = this.props;
    const { theme } = this.context;
    const classes = Category.getClasses({ theme });
    const features = category.get('features');
    const name = category.get('name');

    return (
      <Fragment>
        <h3 className={classes.name}>{name}</h3>
        {features.map(feature => (
          <Feature
              feature={feature}
              key={feature.get('id')}
              navigateToPage={navigateToPage}
          />
        ))}
      </Fragment>
    );
  }
}

export default withRouter(Category);

Category.contextType = ApplicationContext;

Category.getClasses = config => {
  const styles = Category.getStyles(config);

  return {
    container: css(styles.container),
    name: css(styles.name)
  };
};

Category.propTypes = {
  /** Component data */
  category: ImmutablePropTypes.map.isRequired
};

/**
 * Dynamically generates styles
 * @methodof Category
 * @returns {object} The class's styles
 */
Category.getStyles = config =>
  StyleSheet.create({
    name: {
      color: config.theme.getIn(['app', 'color', 'headerText']),
      margin: '10px 10px 10px'
    }
  });
