/**
 * Created by igreenou on 12/18/18.
 */
import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import Logo from '../../assets/images/logo/index';
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
    const { theme } = this.context;
    const styles = Divider.getStyles({ theme });

    return (
      <div id="divider" className={css(styles.container)}>
        <div className={css(styles.spacer)} />
        <div className={css(styles.middle)} />
        <div className={css([styles.spacer, styles.bottom])} />
        <div className={css(styles.icon)}>
          <Logo
            background={theme.getIn(['app', 'color', 'background'])}
            foreground={theme.getIn(['app', 'color', 'logo'])}
            size={24}
          />
        </div>
      </div>
    );
  }
}

Divider.contextType = ApplicationContext;

// TODO convert JS-in-CSS to CSS when possible
Divider.getStyles = config =>
  StyleSheet.create({
    container: {
      position: 'relative'
    },
    icon: {
      top: '0',
      color: 'black',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '43px',
      left: '0',
      width: '100%'
    },
    middle: {
      background: `linear-gradient(to right, ${config.theme.getIn([
        'app',
        'color',
        'background'
      ])} 25%, ${config.theme.getIn([
        'app',
        'color',
        'logo'
      ])} 51%, ${config.theme.getIn(['app', 'color', 'background'])} 75%)`,
      height: '1px'
    },
    bottom: {
      margin: '0px 0px 10px !important'
    },
    spacer: {
      height: '20px',
      width: '100%'
    }
  });

export default Divider;
