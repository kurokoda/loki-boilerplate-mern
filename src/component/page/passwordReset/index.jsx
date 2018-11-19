/** @module ResetPasswordPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import qs from 'qs';
import * as React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { PASSWORD_RESET as RESET_PASSWORD_CONFIG } from '../../../utils/route/config';
import ResetPasswordForm from '../../form/resetPassword';
import Helmet from './helmet';

/**
 * The application about page component.
 *
 * @returns {xml} The ResetPasswordPage component
 */

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onResetPasswordError = this.onResetPasswordError.bind(this);
    this.onResetPasswordSuccess = this.onResetPasswordSuccess.bind(this);
  }

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Fetches page data and resets page position
   * @returns {void}
   */
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { history } = this.props;
    const classes = ResetPasswordPage.getClasses();
    const query = qs.parse(history.location.search.slice(1));
    const { token } = query;

    return (
      <React.Fragment>
        {!token && <Redirect to="/error" />}
        <Helmet />
        <div id="password-reset-page" className={classes.container}>
          Reset Password Page
          <ResetPasswordForm onSubmit={this.onSubmitForm} />
        </div>
      </React.Fragment>
    );
  }

  onSubmitForm(props) {
    const url =
      process.env.REACT_APP_KLAW_API_BASE_URL +
      RESET_PASSWORD_CONFIG.api.resetPassword;

    fetch(url, {
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(res =>
        res.ok ? Promise.resolve(res.json()) : Promise.reject(res.status)
      )
      .then(payload => {
        this.onResetPasswordSuccess(payload);
      })
      .catch(error => {
        this.onResetPasswordError(error);
      });
  }

  onResetPasswordSuccess(payload) {
    const { resetPasswordSuccess } = this.props;
    resetPasswordSuccess(payload);
  }

  onResetPasswordError(error) {
    switch (error) {
      case 404:
        console.log('No user found'); // tslint:disable-line:no-console
        break;
      default:
        console.log('Unhandled server error', error); // tslint:disable-line:no-console
    }
    return this;
  }
}

ResetPasswordPage.propTypes = {
  resetPasswordSuccess: PropTypes.func.isRequired
};

ResetPasswordPage.getClasses = () => {
  const styles = ResetPasswordPage.getStyles();

  return {
    container: css(styles.container)
  };
};

ResetPasswordPage.getStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)'
    }
  });

export default withRouter(ResetPasswordPage);

// TODO move getStyles() from render to componentDidMount
