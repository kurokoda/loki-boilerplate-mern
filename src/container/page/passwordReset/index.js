import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { log as logAction } from '../../../actions/logging';

class PasswordResetContainer extends Component {
  render = () => {
    const { Layout, log } = this.props;

    return <Layout log={log} />;
  };
}

export function mapStateToProps() {
  return null;
}

export function mapDispatchToProps(dispatch) {
  return {
    log: payload => dispatch(logAction(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetContainer);

PasswordResetContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired
};
