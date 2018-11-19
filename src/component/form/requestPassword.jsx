import { css, StyleSheet } from 'aphrodite';
import { Form, Text } from 'informed';
import PropTypes from 'prop-types';
import * as React from 'react';
import { email as emailValidation } from '../../validation';
import Error from './error';

/**
 * The application request-Password form component.
 */

class RequestPasswordForm extends React.Component {
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
    const classes = RequestPasswordForm.getClasses();

    return (
      <Form id="request-password-form" onSubmit={this.onSubmit}>
        {({ formState }) => {
          const emailError = formState.errors.email;
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
              <button className="btn btn-primary" type="submit">
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

RequestPasswordForm.getClasses = () => {
  const styles = RequestPasswordForm.getStyles();

  return {
    input: css(styles.input)
  };
};

// TODO convert JS-in-CSS to CSS when possible

RequestPasswordForm.getStyles = () =>
  StyleSheet.create({
    input: {
      width: '300px'
    }
  });

RequestPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RequestPasswordForm;
