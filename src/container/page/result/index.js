import {connect} from "react-redux";
import {
  fetchPageDataError, fetchResultPageData, fetchResultPageDataSuccess, flushPageData
} from "../../../actions/page";
import { analyticsCallArticleLinkAction } from "../../../actions/analytics";

import {ResultPage} from "../../../component/page";

export function mapStateToProps({resultPageData, votes}) {
  return {
    pageData: resultPageData, votes
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: () => dispatch(fetchResultPageData()),
    fetchPageDataSuccess: payload => dispatch(fetchResultPageDataSuccess(payload)),
    fetchPageDataError: () => dispatch(fetchPageDataError()),
    flushPageData: () => dispatch(flushPageData()),
    analyticsCallArticleLinkAction: () =>
      dispatch(analyticsCallArticleLinkAction())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
