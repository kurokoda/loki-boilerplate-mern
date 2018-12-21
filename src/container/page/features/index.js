import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchPageData as fetchPageDataAction } from '../../../actions/page';
import { log as logAction } from '../../../actions/logging';

class FeaturesContainer extends Component {
  render = () => {
    const { Layout } = this.props;

    return (
      <Layout {...this.props} />
    );
  };
}

export function mapStateToProps({ pageData }) {
  return {
    pageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (type, onSuccess, onError) =>
      dispatch(fetchPageDataAction(type, onSuccess, onError)),
    log: payload => dispatch(logAction(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesContainer);

FeaturesContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
  fetchPageData: PropTypes.func.isRequired,
  pageData: ImmutablePropTypes.map
};

FeaturesContainer.defaultProps = {
  pageData: null
};
