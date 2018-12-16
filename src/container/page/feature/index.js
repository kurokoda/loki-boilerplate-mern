import { connect } from 'react-redux';
import { fetchPageData } from '../../../actions/page';
import { FeaturePage } from '../../../component/page';

export function mapStateToProps({ pageData }) {
  return {
    pageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (type, onSuccess, onError) =>
      dispatch(fetchPageData(type, onSuccess, onError))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturePage);
