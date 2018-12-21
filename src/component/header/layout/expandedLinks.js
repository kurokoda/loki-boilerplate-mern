import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import { getIncrementedElementName } from '../../../utils/collection/index';
import { localize } from '../../../utils/strings/index';
import { ROUTES } from '../../../utils/route/index';
import ActionLink from '../links/actionLink';
import LogoLink from '../links/logoLink';
import PageLink from '../links/pageLink';
import { ApplicationContext } from '../../../context/application';

/**
 * The application expandedLinks component. Contains page links.
 * @return {XML} A expandedLinks component
 */
class ExpandedLinks extends Component {
  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      // This is necessary to update the display of the correct link's activeState
      this.forceUpdate();
    });
  }

  render() {
    const {
      getOnLinkClick,
      onLogoClick,
      signIn,
      signOut,
      signUp,
      user
    } = this.props;
    const { theme } = this.context;
    const strings = this.context.strings;
    const classes = ExpandedLinks.getClasses({ theme });

    return (
      <div>
        <div id="expandedExpandedLinks" className={classes.container}>
          <div
            id="expandedLinks__links-container"
            className={classes.linksContainer}
          >
            <LogoLink callback={onLogoClick} />
            <div className={classes.links}>
              {ROUTES.map(route => {
                let result;
                // Determine if each link should display based on the application state
                if (
                  route.navMenu === 'always' ||
                  (route.navMenu === 'no-user' && !user) ||
                  (route.navMenu === 'user' && user)
                ) {
                  result = (
                    <PageLink
                      onClick={getOnLinkClick(route)}
                      key={getIncrementedElementName('desktopPageLink')}
                      route={route}
                    >
                      {localize(strings, [
                        'header',
                        'links',
                        route.camelCaseKey
                      ]).toUpperCase()}
                    </PageLink>
                  );
                }
                return result;
              })}
              <div className={classes.userLinkContainer}>
                {!user && (
                  <Fragment>
                    <ActionLink onClick={signIn}>
                      {localize(strings, [
                        'header',
                        'links',
                        'signIn'
                      ]).toUpperCase()}
                    </ActionLink>
                    <ActionLink onClick={signUp}>
                      {localize(strings, [
                        'header',
                        'links',
                        'signUp'
                      ]).toUpperCase()}
                    </ActionLink>
                  </Fragment>
                )}
                {user && (
                  <ActionLink onClick={signOut}>
                    {localize(strings, [
                      'header',
                      'links',
                      'signOut'
                    ]).toUpperCase()}
                  </ActionLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ExpandedLinks);

ExpandedLinks.propTypes = {
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired,
  /** The application hide modal action */
  modalHide: PropTypes.func.isRequired,
  /** The application show modal action */
  modalShow: PropTypes.func.isRequired,
  /** The application user sign in action */
  signIn: PropTypes.func.isRequired,
  /** The application user sign up action */
  signUp: PropTypes.func.isRequired,
  /** The application user sign out action */
  signOut: PropTypes.func.isRequired,
  /** The application user */
  user: ImmutablePropTypes.map
};

ExpandedLinks.defaultProps = {
  user: null
};

ExpandedLinks.getClasses = config => {
  const styles = ExpandedLinks.getStyles(config);

  return {
    activeLink: css(styles.activeLink),
    container: css(styles.container),
    iconColor: css(styles.iconColor),
    link: css(styles.link),
    links: css(styles.links),
    linksContainer: css(styles.linksContainer),
    logoContainer: css(styles.logoContainer),
    page: css(styles.page),
    userLinkContainer: css(styles.userLinkContainer)
  };
};

ExpandedLinks.getStyles = config =>
  StyleSheet.create({
    activeLink: {
      color: 'blue',
      display: 'inline',
      fontWeight: 'bold'
    },
    container: {
      backgroundColor: config.theme.getIn(['header', 'color', 'background']),
      boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.2)',
      width: '100%',
      height: '102px',
      padding: '0 20px 0 20px'
    },
    iconColor: {
      color: 'inherit'
    },
    links: {
      fontSize: '16px',
      letterSpacing: '0.6px',
      position: 'relative',
      width: '100%'
    },
    linksContainer: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      margin: 'auto',
      maxWidth: '1240px',
      width: '100%'
    },
    logoContainer: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      margin: '0 20px 0 20px'
    },
    userLinkContainer: {
      display: 'inline-block',
      fontSize: '12px',
      float: 'right'
    }
  });

ExpandedLinks.contextType = ApplicationContext;