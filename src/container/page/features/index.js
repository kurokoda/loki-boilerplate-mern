import { connect } from 'react-redux';
import {
  fetchPageData
} from '../../../actions/page';
import { FeaturesPage } from '../../../component/page';

export function mapStateToProps({ pageData, localization }) {
  return {
    localization,
    pageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (type, onSuccess, onError) => dispatch(fetchPageData(type, onSuccess, onError))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesPage);
