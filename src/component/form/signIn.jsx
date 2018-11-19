import { css, StyleSheet } from 'aphrodite';
import { Form, Text } from 'informed';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  email as emailValidation,
  password as passwordValidation
} from '../../validation';
import Error from './error';

/**
 * The application sign-in form component.
 */

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const classes = SignInForm.getClasses();

    return (
      <Form id="sign-in-form" onSubmit={this.onSubmit}>
        {({ formState }) => {
          const passwordError = formState.errors.password;
          const emailError = formState.errors.email;
          return (
            <div>
              <div className="form-group">
                <label htmlFor="email-field">Email</label>
                <Text
                  className={`form-control ${classes.input}`}
                  field="email"
                  id="email-field"
                  validate={emailValidation}
                  validateOnChange
                />
                <Error error={emailError} />
                <label htmlFor="password-field">Password</label>
                <Text
                  className={`form-control ${classes.input}`}
                  field="password"
                  id="password-field"
                  type="password"
                  validate={passwordValidation}
                  validateOnChange
                />
                <Error error={passwordError} />
                <button
                  className={`btn btn-primary ${classes.button}`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <Link to="/password-request">I forgot my password</Link>
            </div>
          );
        }}
      </Form>
    );
  }

  onSubmit(props) {
    const { onSubmit } = this.props;

    onSubmit(props);
  }
}

SignInForm.getClasses = () => {
  const styles = SignInForm.getStyles();

  return {
    button: css(styles.button),
    input: css(styles.input)
  };
};

// TODO convert JS-in-CSS to CSS when possible

SignInForm.getStyles = () =>
  StyleSheet.create({
    input: {
      width: '300px'
    },
    button: {
      background: '#385FCC'
    }
  });

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SignInForm;
