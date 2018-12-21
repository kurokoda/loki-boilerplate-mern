import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import CollapsedLinks from './layout/collapsedLinks';
import ExpandedLinks from './layout/expandedLinks';
import SignInForm from '../form/signIn';
import SignUpForm from '../form/signUp';
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
    const { theme } = this.context;
    const classes = Header.getClasses({ theme });
    return (
      <Fragment>
        <div className={classes.expandedLinks}>
          <ExpandedLinks
            {...this.props}
            getOnLinkClick={this.getOnLinkClick}
            onLogoClick={this.onLogoClick}
            signIn={this.signIn}
            signUp={this.signUp}
          />
        </div>
        <div className={classes.collapsedLinks}>
          <CollapsedLinks
            {...this.props}
            getOnLinkClick={this.getOnLinkClick}
            onLogoClick={this.onLogoClick}
            signIn={this.signIn}
            signUp={this.signUp}
          />
        </div>
      </Fragment>
    );
  }

  getOnLinkClick = route => {
    const { navigateToPage, setCollapsedHeaderMenuOpen } = this.props;
    return () => {
      setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
      navigateToPage(route.type);
    };
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
    const { navigateToPage, setCollapsedHeaderMenuOpen } = this.props;
    setCollapsedHeaderMenuOpen({ isCollapseHeaderMenuOpen: false });
    navigateToPage('home');
  };

  onSignIn = props => {
    const { signIn } = this.props;

    signIn(props, this.onSignInSuccess, this.onSignInError);
  };

  onSignInSuccess = payload => {
    const { modalHide, navigateToPage } = this.props;
    modalHide();
    navigateToPage('welcome');
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

Header.propTypes = {};

Header.defaultProps = {};

Header.getClasses = config => {
  const styles = Header.getStyles(config);

  return {
    collapsedLinks: css(styles.collapsedLinks),
    expandedLinks: css(styles.expandedLinks)
  };
};

Header.getStyles = config =>
  StyleSheet.create({
    expandedLinks: {
      display: 'block',

      '@media (max-width: 769px)': {
        display: 'none'
      }
    },
    collapsedLinks: {
      display: 'none',

      '@media (max-width: 769px)': {
        display: 'block'
      }
    }
  });
