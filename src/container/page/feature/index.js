import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchPageData as fetchPageDataAction } from '../../../actions/page';
import { log as logAction } from '../../../actions/logging';

class FeatureContainer extends Component {
  render = () => {
    const { fetchPageData, Layout, log, pageData } = this.props;

    return (
      <Layout fetchPageData={fetchPageData} log={log} pageData={pageData} />
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
    fetchPageData: (type, params, onSuccess, onError) =>
      dispatch(fetchPageDataAction(type, params, onSuccess, onError)),
    log: payload => dispatch(logAction(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureContainer);

FeatureContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
  fetchPageData: PropTypes.func.isRequired,
  pageData: ImmutablePropTypes.map
};

FeatureContainer.defaultProps = {
  pageData: null
};
