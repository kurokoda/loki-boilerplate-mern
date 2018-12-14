/** @module AboutPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { ABOUT as ROUTE_CONFIG } from '../../../utils/route/config';
import Loading from '../../loading';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class AboutPage extends Component {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Fetches page data, resets page position, and adds onResize event listener
   * @returns {void}
   */
  componentDidMount() {
    !this.hasPageData && this.fetchPageData();
    window.scrollTo(0, 0);
  }

  render() {
    const classes = AboutPage.getClasses();
    const { localization } = this.props;
    const title = localization.getIn(['about', 'title']).toUpperCase();

    return (
      <Fragment>
        {// Browser render with data:
        // display the page normally
        this.hasPageData && (
          <div id="about-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{title}</h3>
              <br />
              <h5 className={classes.header}>
                A scalable, standardized boilerplate for rapid application
                development
              </h5>
              <br />
              <p className={classes.text}>
                Bacon ipsum dolor amet jowl picanha ground round ball tip
                bresaola ham pork chop jerky ham hock doner leberkas frankfurter
                kielbasa porchetta tongue. Meatloaf tri-tip kielbasa, rump tail
                short loin shankle leberkas pork ground round. Spare ribs pork
                picanha boudin, andouille burgdoggen tongue fatback prosciutto
                tenderloin. Pancetta tenderloin t-bone, chuck leberkas corned
                beef andouille pastrami jerky bacon shank turkey prosciutto
                chicken. Filet mignon picanha pork belly kevin shank kielbasa
                beef ribs tongue turducken sirloin biltong salami short ribs.
              </p>
              <br />
              <h5 className={classes.header}>Opinionated style rules</h5>
              <br />
              <p className={classes.text}>
                Meatloaf corned beef ground round shoulder ball tip fatback
                bacon brisket jerky beef shankle. Boudin brisket buffalo, corned
                beef beef pork meatloaf rump cupim shoulder prosciutto tail
                shankle burgdoggen cow. Buffalo chicken ham, pastrami boudin
                burgdoggen shankle t-bone. Buffalo tri-tip doner biltong beef
                sirloin. Capicola porchetta beef ribs pig andouille pork loin
                bresaola rump short ribs sirloin picanha swine. Pig shankle
                short loin, burgdoggen alcatra porchetta shank swine meatloaf
                chicken ham andouille. Sausage spare ribs bresaola meatball
                leberkas ribeye t-bone capicola shankle pancetta beef ribs
                tenderloin brisket alcatra.
              </p>
              <br />
              <h5 className={classes.header}>
                Start with everything, build with what you need.
              </h5>
              <br />
              <p className={classes.text}>
                Cupim tenderloin porchetta ham hock meatloaf, spare ribs
                kielbasa bresaola bacon turducken burgdoggen. Pork chop pig
                jowl, prosciutto sausage drumstick shoulder leberkas beef ribs.
                Cow capicola jowl, picanha kevin biltong porchetta ribeye beef
                chuck bresaola kielbasa swine. Shoulder andouille ham pork
                belly, cupim sirloin pork loin rump turducken kielbasa
                frankfurter porchetta burgdoggen drumstick. Andouille biltong
                pork chop turducken rump chicken boudin. Pork belly burgdoggen
                shankle andouille.
              </p>
              <br />
              <h5 className={classes.header}>
                Every effort should leverage opportunity for maximum benefit
              </h5>
              <br />
              <p className={classes.text}>
                Kevin jowl meatloaf tongue, kielbasa prosciutto picanha pork
                leberkas short loin sausage salami short ribs flank chuck.
                Fatback pig sausage sirloin salami andouille burgdoggen rump
                strip steak spare ribs pork hamburger kielbasa. Jerky beef tail
                ham hock fatback leberkas tri-tip cow t-bone cupim spare ribs
                drumstick ham corned beef shoulder. Ball tip jerky pork loin
                sausage burgdoggen, beef fatback. Kielbasa ham biltong hamburger
                burgdoggen boudin pancetta rump buffalo.
              </p>
              <br />
            </Well>
          </div>
        )}
        {// Browser or server render without data:
        //    display the loading component without Helmet
        !this.hasPageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  fetchPageData() {
    const { fetchPageData } = this.props;

    fetchPageData(
      ROUTE_CONFIG.type,
      this.onFetchPageDataSuccess,
      this.onFetchPageDataError
    );
  }

  onFetchPageDataSuccess = () => {}; // tslint:disable-line:no-empty

  onFetchPageDataError = error => {}; // tslint:disable-line:no-empty

  get hasPageData() {
    const { pageData } = this.props;
    return pageData && pageData.get('pageType') === ROUTE_CONFIG.type;
  }
}

AboutPage.getClasses = () => {
  const styles = AboutPage.getStyles();

  return {
    container: css(styles.container),
    header: css(styles.header),
    text: css(styles.text)
  };
};

/**
 * Dynamically generates styles
 * @methodof AboutPage
 * @returns {object} The class's styles
 */
AboutPage.getStyles = () =>
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


AboutPage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired,
  /** Localization text */
  localization: ImmutablePropTypes.map.isRequired,
  /** Page data */
  pageData: ImmutablePropTypes.map
};

AboutPage.defaultProps = {
  pageData: null
};

export default withRouter(AboutPage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
