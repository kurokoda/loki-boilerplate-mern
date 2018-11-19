import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import * as React from 'react';

/**
 * The application sign-in form component.
 */

class Error extends React.Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { error } = this.props;
    const classes = Error.getClasses();

    return (
      <div className={classes.errorContainer}>
        {error && <div className={classes.error}>{error}</div>}
      </div>
    );
  }
}

Error.getClasses = () => {
  const styles = Error.getStyles();

  return {
    error: css(styles.error),
    errorContainer: css(styles.errorContainer)
  };
};

// TODO convert JS-in-CSS to CSS when possible

Error.getStyles = () =>
  StyleSheet.create({
    error: {
      color: '#FF0000',
      fontSize: '10px'
    },
    errorContainer: {
      height: '20px'
    }
  });

Error.propTypes = {
  error: PropTypes.string
};

Error.defaultProps = {
  error: null
};

export default Error;
