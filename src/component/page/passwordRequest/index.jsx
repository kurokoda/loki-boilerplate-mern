/** @module RequestPasswordPage */

import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import * as React from 'react';
import { withRouter } from 'react-router';
import { PASSWORD_REQUEST as REQUEST_PASSWORD_CONFIG } from '../../../utils/route/config';
import RequestPasswordForm from '../../form/requestPassword';
import Helmet from './helmet';

/**
 * The application about page component.
 *
 * @returns {xml} The RequestPasswordPage component
 */

class RequestPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onRequestPasswordError = this.onRequestPasswordError.bind(this);
    this.onRequestPasswordSuccess = this.onRequestPasswordSuccess.bind(this);
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
    const classes = RequestPasswordPage.getClasses();

    return (
      <React.Fragment>
        <Helmet />
        <div id="request-password-page" className={classes.container}>
          Request Password Page
          <RequestPasswordForm onSubmit={this.onSubmitForm} />
        </div>
      </React.Fragment>
    );
  }

  onSubmitForm(props) {
    const url =
      process.env.REACT_APP_KLAW_API_BASE_URL +
      REQUEST_PASSWORD_CONFIG.api.requestPassword;

    fetch(url, {
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    })
      .then(
        res =>
          res.ok ? Promise.resolve(res.json()) : Promise.reject(res.status)
      )
      .then(payload => {
        this.onRequestPasswordSuccess(payload);
      })
      .catch(error => {
        this.onRequestPasswordError(error);
      });
  }

  onRequestPasswordSuccess(payload) {
    const { requestPasswordSuccess } = this.props;
    requestPasswordSuccess(payload);
  }

  onRequestPasswordError(error) {
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

RequestPasswordPage.propTypes = {
  requestPasswordSuccess: PropTypes.func.isRequired
};

RequestPasswordPage.getClasses = () => {
  const styles = RequestPasswordPage.getStyles();

  return {
    container: css(styles.container)
  };
};

RequestPasswordPage.getStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: 'calc(100vh-100px)'
    }
  });

export default withRouter(RequestPasswordPage);

// TODO move getStyles() from render to componentDidMount
