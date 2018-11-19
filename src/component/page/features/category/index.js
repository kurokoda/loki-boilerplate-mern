/** @module Category */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import Feature from '../feature';
import { Well } from '../../../shared';
import style from '../../../../config/style';

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
    const classes = Category.getClasses();
    const { category } = this.props;

    const features = category.get('features');
    const name = category.get('name');

    return (
      <Fragment>
        <Well>
          <h3 className={classes.name}>{name}</h3>
          {features.map(feature => <Feature feature={feature} key={feature.get('id')} />)}
        </Well>
      </Fragment>
    );
  }
}

Category.getClasses = () => {
  const styles = Category.getStyles();

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
Category.getStyles = () =>
  StyleSheet.create({
    name: {
      color: style.feature.color.headerText,
      margin: '10px 10px 10px',
    }
  });

export default withRouter(Category);
