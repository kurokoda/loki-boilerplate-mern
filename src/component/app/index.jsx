/* eslint-disable react/prefer-stateless-function */

import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Modal from '../../component/modal';
import Body from '../../container/body';
import Footer from '../../container/footer';
import Header from '../../container/header';
import Subheader from '../../component/subheader';
import Helmet from './helmet';
import style from '../../theme';

/**
 * This is the top-level application component. It acts as the root of the component tree
 */

class App extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { modal } = this.props;
    const classes = App.getClasses();
    return (
      <main className={classes.applicationContainer} id="application">
        <Helmet />
        <div className={classes.headerContainer}>
          <Header {...this.props} />
        </div>
        <Subheader />
        <Body {...this.props} />
        <Footer {...this.props} />
        <div className={classes.modalContainer}>
          <Modal config={modal} />
        </div>
      </main>
    );
  }
}

App.getClasses = () => {
  const styles = App.getStyles();

  return {
    applicationContainer: css(styles.applicationContainer),
    headerContainer: css(styles.headerContainer),
    modalContainer: css(styles.modalContainer)
  };
};

App.getStyles = () =>
  StyleSheet.create({
    applicationContainer: {
      backgroundColor: style.app.color.background,
      position: 'relative'
    },
    headerContainer: {
      position: 'absolute',
      width: '100%',
      zIndex: '100'
    },
    modalContainer: {
      position: 'absolute',
      zIndex: '1000'
    }
  });

export default withRouter(App);
