import { connect } from "react-redux";
import {
  analyticsCallArticleLinkAction,
  analyticsClearArticleMetadata,
  moreFromTyltAction
} from "../../../actions/analytics";
import {
  fetchHomePageData,
  fetchHomePageDataSuccess,
  fetchPageDataError,
  flushPageData
} from "../../../actions/page";

import { HomePage } from "../../../component/page";

export function mapStateToProps({ homePageData }) {
  return {
    pageData: homePageData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: () => dispatch(fetchHomePageData()),
    fetchPageDataSuccess: payload =>
      dispatch(fetchHomePageDataSuccess(payload)),
    fetchPageDataError: () => dispatch(fetchPageDataError()),
    flushPageData: () => dispatch(flushPageData()),
    analyticsCallArticleLinkAction: () =>
      dispatch(analyticsCallArticleLinkAction()),
    analyticsClearArticleMetadata: () =>
      dispatch(analyticsClearArticleMetadata())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
