/** @module WelcomePage */

import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect, withRouter } from 'react-router';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class WelcomePage extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Resets page position
   * @returns {void}
   */
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const classes = WelcomePage.getClasses();
    const { user } = this.props;

    return (
      <Fragment>
        {// Redirect if there is no user
        !user && <Redirect to="/" />}
        <div id="home-page" className={classes.container}>
          <Helmet />
          <Well>
            <h3 className={classes.header}>SECRET WELCOME PAGE</h3>
            <p className={classes.text}>
              Bacon ipsum dolor amet jowl picanha ground round ball tip bresaola
              ham pork chop jerky ham hock doner leberkas frankfurter kielbasa
              porchetta tongue. Meatloaf tri-tip kielbasa, rump tail short loin
              shankle leberkas pork ground round. Spare ribs pork picanha
              boudin, andouille burgdoggen tongue fatback prosciutto tenderloin.
              Pancetta tenderloin t-bone, chuck leberkas corned beef andouille
              pastrami jerky bacon shank turkey prosciutto chicken. Filet mignon
              picanha pork belly kevin shank kielbasa beef ribs tongue turducken
              sirloin biltong salami short ribs.
            </p>
            <p className={classes.text}>
              Meatloaf corned beef ground round shoulder ball tip fatback bacon
              brisket jerky beef shankle. Boudin brisket buffalo, corned beef
              beef pork meatloaf rump cupim shoulder prosciutto tail shankle
              burgdoggen cow. Buffalo chicken ham, pastrami boudin burgdoggen
              shankle t-bone. Buffalo tri-tip doner biltong beef sirloin.
              Capicola porchetta beef ribs pig andouille pork loin bresaola rump
              short ribs sirloin picanha swine. Pig shankle short loin,
              burgdoggen alcatra porchetta shank swine meatloaf chicken ham
              andouille. Sausage spare ribs bresaola meatball leberkas ribeye
              t-bone capicola shankle pancetta beef ribs tenderloin brisket
              alcatra.{' '}
            </p>
            <p className={classes.text}>
              Cupim tenderloin porchetta ham hock meatloaf, spare ribs kielbasa
              bresaola bacon turducken burgdoggen. Pork chop pig jowl,
              prosciutto sausage drumstick shoulder leberkas beef ribs. Cow
              capicola jowl, picanha kevin biltong porchetta ribeye beef chuck
              bresaola kielbasa swine. Shoulder andouille ham pork belly, cupim
              sirloin pork loin rump turducken kielbasa frankfurter porchetta
              burgdoggen drumstick. Andouille biltong pork chop turducken rump
              chicken boudin. Pork belly burgdoggen shankle andouille.
            </p>
          </Well>
        </div>
      </Fragment>
    );
  }
}

WelcomePage.getClasses = () => {
  const styles = WelcomePage.getStyles();

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof HomePage
 * @returns {object} The class's styles
 */
WelcomePage.getStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)',
      padding: '0 40px 0 40px',
      width: '100%'
    },
    header: {
      color: style.about.color.headerText,
      textTransform: 'uppercase'
    },
    text: {
      color: style.about.color.text,
      fontSize: '18px'
    }
  });

WelcomePage.propTypes = {
  user: ImmutablePropTypes.map.isRequired
};

export default withRouter(WelcomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
