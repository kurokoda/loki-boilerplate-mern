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
 * The application desktopLinks component. Contains page links.
 * @return {XML} A desktopLinks component
 */
class DesktopLinks extends Component {
  static contextType = ApplicationContext;

  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      // This is necessary to update the display of the correct link's activeState
      this.forceUpdate();
    });
  }

  render() {
    const { application, getOnLinkClick, onLogoClick, user } = this.props;
    const { theme } = this.context;
    const strings = this.context.strings;
    const classes = DesktopLinks.getClasses({ theme });
    const isMenuOpen = application.get('isCollapseHeaderMenuOpen');

    return (
      <div>
        <div id="header" className={classes.container}>
          <LogoLink callback={onLogoClick} />
          <button
            className={`btn ${classes.button}`}
            onClick={this.setCollapsedHeaderMenuOpen}
            onKeyDown={this.setCollapsedHeaderMenuOpen}
          >
            <i className="fas fa-bars" />
          </button>
        </div>
        {isMenuOpen && (
          <div className={classes.linksContainer} onClick={this.onClickOutside}>
            {ROUTES.map(route => {
              let result;
              // Determine if each link should display based on the application state
              if (
                route.navMenu === 'always' ||
                (route.navMenu === 'no-user' && !user) ||
                (route.navMenu === 'user' && user)
              ) {
                result = (
                  <div
                    className={classes.linkContainer}
                    onClick={getOnLinkClick(route)}
                  >
                    <PageLink
                      key={getIncrementedElementName('desktopPageLink')}
                      route={route}
                    >
                      {localize(strings, [
                        'header',
                        'links',
                        route.camelCaseKey
                      ]).toUpperCase()}
                    </PageLink>
                  </div>
                );
              }
              return result;
            })}
            <div className={classes.userLinkContainer}>
              {!user && (
                <Fragment>
                  <div className={classes.linkContainer} onClick={this.signIn}>
                    <ActionLink>
                      {localize(strings, [
                        'header',
                        'links',
                        'signIn'
                      ]).toUpperCase()}
                    </ActionLink>
                  </div>
                  <div className={classes.linkContainer} onClick={this.signUp}>
                    <ActionLink>
                      {localize(strings, [
                        'header',
                        'links',
                        'signUp'
                      ]).toUpperCase()}
                    </ActionLink>
                  </div>
                </Fragment>
              )}
              {user && (
                <div className={classes.linkContainer} onClick={this.signOut}>
                  <ActionLink>
                    {localize(strings, [
                      'header',
                      'links',
                      'signOut'
                    ]).toUpperCase()}
                  </ActionLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  signIn = (event) => {
    const { signIn, setCollapsedHeaderMenuOpen } = this.props;
    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
    signIn();
    event.preventDefault();
    event.stopPropagation();
  };

  signUp = (event) => {
    const { signUp, setCollapsedHeaderMenuOpen } = this.props;
    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
    signUp();
    event.preventDefault();
    event.stopPropagation();
  };

  signOut = (event) => {
    const { signOut, setCollapsedHeaderMenuOpen } = this.props;
    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
    signOut();
    event.preventDefault();
    event.stopPropagation();
  };

  onClickOutside = () => {
    const { setCollapsedHeaderMenuOpen } = this.props;
    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
  }

  setCollapsedHeaderMenuOpen = () => {
    const { application, setCollapsedHeaderMenuOpen } = this.props;
    const isMenuOpen = application.get('isCollapseHeaderMenuOpen');

    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: !isMenuOpen });
  };
}

export default withRouter(DesktopLinks);

DesktopLinks.propTypes = {
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

DesktopLinks.defaultProps = {
  user: null
};

DesktopLinks.getClasses = config => {
  const styles = DesktopLinks.getStyles(config);

  return {
    button: css(styles.button),
    container: css(styles.container),
    linkContainer: css(styles.linkContainer),
    linksContainer: css(styles.linksContainer)
  };
};

DesktopLinks.getStyles = config =>
  StyleSheet.create({
    container: {
      backgroundColor: config.theme.getIn(['header', 'color', 'background']),
      display: 'relative',
      height: '60px',
      textAlign: 'center',
      width: '100%'
    },
    linkContainer: {
      alignItems: 'center',
      borderBottom: ' 1px  solid black',
      cursor: 'pointer',
      display: 'flex',
      fontSize: '18px',
      height: '60px',
      padding: '0 0 0 20px'
    },
    linksContainer: {
      background: 'rgba(255, 255, 255, 0.85)',
      height: 'calc(100vh - 60px)'
    },
    button: {
      color: config.theme.getIn(['app', 'color', 'text']),
      fontSize: '20pt',
      outline: 'none',
      position: 'absolute',
      right: '10px',
      top: '8px'
    }
  });
