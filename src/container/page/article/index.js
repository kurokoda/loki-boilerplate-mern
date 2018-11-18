import { connect } from "react-redux";
import {
  analyticsArticleManualVoteAction,
  analyticsArticlePostVoteSocialShareAction,
  analyticsCallArticleLinkAction,
  analyticsGenericSocialShareAction,
  analyticsOptinmonsterAction,
  analyticsUploadArticleMetadata
} from "../../../actions/analytics";
import {
  fetchArticlePageData,
  fetchArticlePageDataSuccess,
  fetchArticlePageCachebustedDatavizData,
  fetchArticlePageCachebustedDatavizDataSuccess,
  fetchArticlePageCachebustedDatavizDataError,
  fetchArticlePageCachebustedVoteData,
  fetchArticlePageCachebustedVoteDataSuccess,
  fetchArticlePageCachebustedVoteDataError,
  fetchPageDataError,
  flushPageData
} from "../../../actions/page";
import {
  voteUpdatedLocally,
  voteUpdatedRemotely
} from "../../../actions/votes";

import { ArticlePage } from "../../../component/page";

export function mapStateToProps({ articlePageData, sessionVotes, votes }) {
  return {
    pageData: articlePageData,
    sessionVotes,
    votes
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    voteUpdatedLocally: payload => dispatch(voteUpdatedLocally(payload)),
    voteUpdatedRemotely: updatedVoteData =>
      dispatch(voteUpdatedRemotely(updatedVoteData)),
    fetchCachebustedVoteData: () =>
      dispatch(fetchArticlePageCachebustedVoteData()),
    fetchCachebustedVoteDataSuccess: payload =>
      dispatch(fetchArticlePageCachebustedVoteDataSuccess(payload)),
    fetchCachebustedVoteDataError: () =>
      dispatch(fetchArticlePageCachebustedVoteDataError()),
    fetchCachebustedDatavizData: () =>
      dispatch(fetchArticlePageCachebustedDatavizData()),
    fetchCachebustedDatavizDataSuccess: payload =>
      dispatch(fetchArticlePageCachebustedDatavizDataSuccess(payload)),
    fetchCachebustedDatavizDataError: () =>
      dispatch(fetchArticlePageCachebustedDatavizDataError()),
    fetchPageData: () => dispatch(fetchArticlePageData()),
    fetchPageDataSuccess: payload =>
      dispatch(fetchArticlePageDataSuccess(payload)),
    fetchPageDataError: () => dispatch(fetchPageDataError()),
    flushPageData: () => dispatch(flushPageData()),
    analyticsGenericSocialShareAction: socialMediaPlatform =>
      dispatch(analyticsGenericSocialShareAction(socialMediaPlatform)),
    analyticsArticlePostVoteSocialShareAction: (article, socialMediaPlatform) =>
      dispatch(
        analyticsArticlePostVoteSocialShareAction(article, socialMediaPlatform)
      ),
    analyticsArticleManualVoteAction: (article, type) =>
      dispatch(analyticsArticleManualVoteAction(article, type)),
    analyticsOptinmonsterAction: () => dispatch(analyticsOptinmonsterAction()),
    analyticsUploadArticleMetadata: article =>
      dispatch(analyticsUploadArticleMetadata(article)),
    analyticsCallArticleLinkAction: () =>
      dispatch(analyticsCallArticleLinkAction())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage);
