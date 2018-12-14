import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import style from '../../config/style';
import { getIncrementedElementName } from '../../utils/collection';
import { localized } from '../../utils/localization';
import { ROUTES } from '../../utils/route';
import SignInForm from '../form/signIn';
import SignUpForm from '../form/signUp';
import ActionLink from './component/desktop/actionLink';
import LogoLink from './component/desktop/logoLink';
import PageLink from './component/desktop/pageLink';
import ModalContainer from '../modal/content/wrapper';
/**
 * The application header component. Contains page links.
 * @return {XML} A header component
 */
class Header extends Component {
  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      // This is necessary to update the display of the correct link's activeState
      this.forceUpdate();
    });
  }

  render() {
    const { localization, signOut, user } = this.props;
    const classes = Header.getClasses({ style });

    return (
      <div id="header" className={classes.container}>
        <div id="header__links-container" className={classes.linksContainer}>
          <LogoLink callback={this.onLogoClick} />
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
                    callback={this.getOnLinkClick(route)}
                    key={getIncrementedElementName('desktopPageLink')}
                    route={route}
                  >
                    {localized(localization, ['header', 'links', route.camelCaseKey]).toUpperCase()}
                  </PageLink>
                );
              }
              return result;
            })}
            <div className={classes.userLinkContainer}>
              {!user && (
                <Fragment>
                  <ActionLink callback={this.signIn}>
                    {localized(localization, ['header', 'links', 'signIn']).toUpperCase()}
                  </ActionLink>
                  <ActionLink callback={this.signUp}>
                    {localized(localization, ['header', 'links', 'signUp']).toUpperCase()}
                  </ActionLink>
                </Fragment>
              )}
              {user && (
                <ActionLink callback={signOut}>
                  {localized(localization, ['header', 'links', 'signOut']).toUpperCase()}
                </ActionLink>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getOnLinkClick = route => {
    const { fetchPageData, history } = this.props;

    if (route.api && route.api.pageData) {
      return () => {
        fetchPageData(
          route.type,
          () => {
            history.push(route.path);
          },
          () => {
            history.push('/error');
          }
        );
      };
    } else {
      return () => {
        history.push(route.path);
      };
    }
  };

  signIn = () => {
    const { modalHide, modalShow } = this.props;

    modalShow({
      Content: () => (
        <ModalContainer title="Sign In" onClose={modalHide}>
          <SignInForm onSubmit={this.onSignIn} />
        </ModalContainer>
      ),
      contentLabel: 'Sign In Form',
      onRequestClose: modalHide
    });
  };

  signUp = () => {
    const { modalHide, modalShow } = this.props;

    modalShow(
      {
        Content: () => (
          <ModalContainer title="Sign Up" onClose={modalHide}>
            <SignUpForm onSubmit={this.onSignUp} />
          </ModalContainer>
        ),
        contentLabel: 'Sign Up Form',
        onRequestClose: modalHide
      },
      this.onSignUpSuccess,
      this.onSignUpError
    );
  };

  onLogoClick = () => {
    const { fetchPageData, history } = this.props;

    fetchPageData(
      'home',
      () => {
        history.push('/');
      },
      () => {
        history.push('/error');
      }
    );
  };

  onSignIn = props => {
    const { signIn } = this.props;

    signIn(props, this.onSignInSuccess, this.onSignInError);
  };

  onSignInSuccess = payload => {
    const { modalHide } = this.props;
    modalHide();
  };

  onSignInError = error => {
    const { modalHide, modalShow } = this.props;

    switch (error) {
      case 404:
        modalShow({
          Content: () => (
            <ModalContainer title="Sign In Error" onClose={modalHide}>
              There was an error signing you in.
            </ModalContainer>
          ),
          contentLabel: 'Sign In Form',
          onRequestClose: modalHide
        });
        break;
      default:
        console.log('Unhandled server error', error); // tslint:disable-line:no-console
    }
    return this;
  };

  onSignUp = props => {
    const { signUp } = this.props;

    signUp(props, this.onSignUpSuccess, this.onSignUpError);
  };

  onSignUpSuccess = () => {
    const { modalHide, modalShow } = this.props;

    modalShow({
      Content: () => (
        <ModalContainer title="Sign Up Success" onClose={modalHide}>
          Welcome to the secret welcome page
        </ModalContainer>
      ),
      contentLabel: 'Sign In Form',
      onRequestClose: modalHide
    });
  };

  onSignUpError = error => {
    const { modalHide, modalShow } = this.props;

    modalShow({
      Content: () => (
        <ModalContainer title="Sign Up Error" onClose={modalHide}>
          There was an error signing you up.
        </ModalContainer>
      ),
      contentLabel: 'Sign In Form',
      onRequestClose: modalHide
    });
  };
}

export default withRouter(Header);

Header.propTypes = {
  /** The application router's history */
  history: ReactRouterPropTypes.history.isRequired,
  /** The application localization config */
  localization: ImmutablePropTypes.map.isRequired,
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

Header.defaultProps = {
  user: null
};

Header.getClasses = config => {
  const styles = Header.getStyles(config);

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

Header.getStyles = () =>
  StyleSheet.create({
    activeLink: {
      color: 'blue',
      display: 'inline',
      fontWeight: 'bold'
    },
    container: {
      backgroundColor: style.header.color.background,
      boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.2)',
      width: '100%',

      '@media (max-width: 768px)': {
        height: '60px',
        padding: '0 10px 0 10px'
      },

      '@media (min-width: 769px)': {
        height: '102px',
        padding: '0 20px 0 20px'
      }
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
      width: '100%',

      '@media (min-width: 1240px)': {
        width: '1240px'
      }
    },
    logoContainer: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',

      '@media (max-width: 768px)': {
        margin: '0 10px 0 10px'
      },

      '@media (min-width: 769px)': {
        margin: '0 20px 0 20px'
      }
    },
    userLinkContainer: {
      display: 'inline-block',
      fontSize: '12px',
      float: 'right'
    }
  });
