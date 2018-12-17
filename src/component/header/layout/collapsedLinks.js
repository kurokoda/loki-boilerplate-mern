import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import SignInForm from '../../form/signIn';
import SignUpForm from '../../form/signUp';
import LogoLink from '../links/logoLink';
import ModalContainer from '../../modal/content/wrapper';
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
    const {  application, setCollapsedHeaderMenuOpen, signOut, user } = this.props;
    const { theme } = this.context;
    const strings = this.context.strings;
    const classes = DesktopLinks.getClasses({ theme });
    const isMenuOpen = application.get('isCollapseHeaderMenuOpen')

    return (
      <div>
        <div id="header" className={classes.container}>
          <LogoLink callback={this.onLogoClick} />
          <button
              className={`btn ${classes.button}`}
              onClick={this.setCollapsedHeaderMenuOpen}
              onKeyDown={this.setCollapsedHeaderMenuOpen}
          >
            <i className="fas fa-bars" />
          </button>
        </div>
        { isMenuOpen && <div className={classes.linkContainer} />}
      </div>
    );
  }

  setCollapsedHeaderMenuOpen = () => {
    const { application, setCollapsedHeaderMenuOpen} = this.props
    const isMenuOpen = application.get('isCollapseHeaderMenuOpen')

    setCollapsedHeaderMenuOpen({isCollapseHeaderMenuOpen: !isMenuOpen});
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
    linkContainer: css(styles.linkContainer)
  };
};

DesktopLinks.getStyles = config =>
  StyleSheet.create({
    container: {
      backgroundColor: config.theme.getIn([
        'header',
        'color',
        'background'
      ]),
      display: 'relative',
      height: '60px',
      textAlign: 'center',
      width: '100%'
    },
    linkContainer: {
      background: 'rgba(0, 0, 0, 0.5)',
      height: 'calc(100vh - 60px)'
    },
    button: {
      fontSize: '20pt',
      position: 'absolute',
      top: '8px',
      right: '10px'
    }
  });
