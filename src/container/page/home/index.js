import { connect } from 'react-redux';
import { fetchPageData } from '../../../actions/page';
import { log } from '../../../actions/logging';

import { HomePage } from '../../../component/page';

export function mapStateToProps({ pageData }) {
  return {
    pageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (type, onSuccess, onError) =>
      dispatch(fetchPageData(type, onSuccess, onError)),
    log: payload => dispatch(log(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
