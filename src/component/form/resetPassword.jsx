import { css, StyleSheet } from 'aphrodite';
import { Form, Text } from 'informed';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  confirmPassword as confirmPasswordValidation,
  passwordWithConfirmation as passwordValidation
} from '../../validation';
import Error from './error';

/**
 * The application sign-in form component.
 */

class ResetPasswordForm extends React.Component {
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
    const classes = ResetPasswordForm.getClasses();

    return (
      <Form id="request-password-form" onSubmit={this.onSubmit}>
        {({ formState }) => {
          const passwordError = formState.errors.password;
          const confirmPasswordError = formState.errors.confirmPassword;
          return (
            <div>
              <div className="form-group">
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
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
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

ResetPasswordForm.getClasses = () => {
  const styles = ResetPasswordForm.getStyles();

  return {
    input: css(styles.input)
  };
};

// TODO convert JS-in-CSS to CSS when possible

ResetPasswordForm.getStyles = () =>
  StyleSheet.create({
    input: {
      width: '300px'
    }
  });

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ResetPasswordForm;
