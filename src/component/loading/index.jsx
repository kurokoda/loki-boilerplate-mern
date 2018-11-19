import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import Logo from '../../assets/images/logo';
/**
 * A loading indication which displays the company logo
 * @returns {xml} The Loading component
 */
class Loading extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div id="loading" className={css(styles.loading)}>
        <Logo size={200} />
      </div>
    );
  }
}

// TODO convert JS-in-CSS to CSS when possible

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
    width: '100%'
  }
});

export default Loading;
