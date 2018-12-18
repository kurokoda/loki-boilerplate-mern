import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { fetchPageData as fetchPageDataAction } from '../../../actions/page';

class MobileWebPage extends Component {
  render = () => {
    const { fetchPageData, Layout, pageData } = this.props;

    return <Layout fetchPageData={fetchPageData} pageData={pageData} />;
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
      dispatch(fetchPageDataAction(type, onSuccess, onError))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileWebPage);

MobileWebPage.propTypes = {
  Layout: PropTypes.node.isRequired,
  fetchPageData: PropTypes.func.isRequired,
  pageData: ImmutablePropTypes.map.isRequired
};
