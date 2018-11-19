import { css, StyleSheet } from 'aphrodite';
import { Form, Text } from 'informed';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  confirmPassword as confirmPasswordValidation,
  email as emailValidation,
  passwordWithConfirmation as passwordValidation
} from '../../validation';
import Error from './error';

/**
 * The application sign-in form component.
 */

class SignUpForm extends React.Component {
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
    const classes = SignUpForm.getClasses();

    return (
      <Form id="sign-up-form" onSubmit={this.onSubmit}>
        {({ formState }) => {
          const emailError = formState.errors.email;
          const passwordError = formState.errors.password;
          const confirmPasswordError = formState.errors.confirmPassword;
          return (
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
                notify={['confirmPassword']}
                type="password"
                validate={passwordValidation}
                validateOnChange
              />
              <Error error={passwordError} />
              <label htmlFor="confirm-password-field">Confirm Password</label>
              <Text
                className={`form-control ${classes.input}`}
                field="confirmPassword"
                id="confirm-password-field"
                notify={['password']}
                type="password"
                validate={confirmPasswordValidation}
                validateOnChange
              />
              <Error error={confirmPasswordError} />
              <button
                className={`btn btn-primary ${classes.button}`}
                type="submit"
              >
                Submit
              </button>
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

SignUpForm.getClasses = () => {
  const styles = SignUpForm.getStyles();

  return {
    button: css(styles.button),
    input: css(styles.input)
  };
};

// TODO convert JS-in-CSS to CSS when possible

SignUpForm.getStyles = () =>
  StyleSheet.create({
    button: {
      background: '#385FCC'
    },
    input: {
      width: '300px'
    }
  });

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SignUpForm;
