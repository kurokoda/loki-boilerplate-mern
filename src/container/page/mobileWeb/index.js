import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPageData } from '../../../actions/page';

class MobileWebPage extends Component {
  render = () => {
    const { Layout, _fetchPageData } = this.props;
    return <Layout fetchPageData={_fetchPageData} />;
  };
}

export function mapStateToProps({ pageData }) {
  return {
    pageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    _fetchPageData: (type, onSuccess, onError) =>
      dispatch(fetchPageData(type, onSuccess, onError))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileWebPage);
