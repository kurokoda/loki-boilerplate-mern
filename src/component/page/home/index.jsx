/** @module HomePage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { HOME as ROUTE_CONFIG } from '../../../utils/route/config';
import Loading from '../../loading';
import { Well } from '../../shared';
import Helmet from './helmet';
import style from '../../../config/style';

class HomePage extends Component {
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
    console.log('hasPageData', this.hasPageData);
    !this.hasPageData && this.fetchPageData();

    window.scrollTo(0, 0);
  }

  render() {
    const classes = HomePage.getClasses();
    const { localization } = this.props;
    const title = localization.getIn(['home', 'title']).toUpperCase();

    return (
      <Fragment>
        {// render with data:
        // display the page normally
        this.hasPageData && (
          <div id="home-page" className={classes.container}>
            <Helmet />
            <Well>
              <h3 className={classes.header}>{title}</h3>
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
                tenderloin brisket alcatra.{' '}
              </p>
              <p className={classes.text}>
                Cupim tenderloin porchetta ham hock meatloaf, spare ribs
                kielbasa bresaola bacon turducken burgdoggen. Pork chop pig
                jowl, prosciutto sausage drumstick shoulder leberkas beef ribs.
                Cow capicola jowl, picanha kevin biltong porchetta ribeye beef
                chuck bresaola kielbasa swine. Shoulder andouille ham pork
                belly, cupim sirloin pork loin rump turducken kielbasa
                frankfurter porchetta burgdoggen drumstick. Andouille biltong
                pork chop turducken rump chicken boudin. Pork belly burgdoggen
                shankle andouille.{' '}
              </p>
            </Well>
          </div>
        )}
        {// Browser or server render without data:
        // display the loading component without Helmet
        !this.hasPageData && <Loading />}
      </Fragment>
    );
  }

  // Business logic

  fetchPageData() {
    const { fetchPageData } = this.props;
    console.log('fetching page data');
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

HomePage.getClasses = () => {
  const styles = HomePage.getStyles();

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
HomePage.getStyles = () =>
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

HomePage.propTypes = {
  /** Dispatches action to request page data */
  fetchPageData: PropTypes.func.isRequired /** Localization text */,
  localization: ImmutablePropTypes.map.isRequired /** Page data */,
  pageData: ImmutablePropTypes.map
};

HomePage.defaultProps = {
  pageData: null
};

export default withRouter(HomePage);

// TODO move getStyles() from render to componentDidMount
// TODO move immutable.js data hack into reducer
