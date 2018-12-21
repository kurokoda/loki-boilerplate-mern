/**
 * Created by igreenou on 12/18/18.
 */
import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { ApplicationContext } from '../../context/application';

/**
 * A divider indication which displays the company logo
 * @returns {xml} The Divider component
 */
class Divider extends Component {
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
        <div id="divider" className={css(styles.container)}>
          <div className={css(styles.spacer)} />
          <div className={css(styles.middle)} />
          <div className={css([styles.spacer, styles.bottom])} />
          <div className={css(styles.icon)}>
            <i className="fas fa-atom"></i>
          </div>
        </div>
    );
  }
}

Divider.contextType = ApplicationContext;

// TODO convert JS-in-CSS to CSS when possible

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  icon: {
    top: '25%',
    color: 'black',
    background: 'white',
    padding: '0 20px 0 20px',
    position: 'absolute',
    left: 'calc(50% - 22px)',
    width: '44px'
  },
  middle: {
    background: 'linear-gradient(to right, #ffffff 25%,#000000 51%,#ffffff 75%)',
    height: '1px',
  },
  bottom: {
    margin: '0px 0px 10px !important',
  },
  spacer: {
    height: '20px',
    width: '100%'
  }
});

export default Divider;
