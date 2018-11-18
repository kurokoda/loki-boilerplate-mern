import {connect} from "react-redux";
import {
  analyticsCallArticleLinkAction, analyticsCategoryManualVoteAction,
  analyticsCategoryPostVoteSocialShareAction
} from "../../../actions/analytics";
import {
  fetchPageDataError, fetchTopicCacheBustedVoteData, fetchTopicCacheBustedVoteDataError,
  fetchTopicCacheBustedVoteDataSuccess, fetchTopicPageData, fetchTopicPageDataSuccess, flushPageData
} from "../../../actions/page";
import {voteUpdatedLocally, voteUpdatedRemotely} from "../../../actions/votes";
import {votingModuleUpdated} from "../../../actions/votingModule";
import {TopicPage} from "../../../component/page";

export function mapStateToProps({
  sessionVotes, topicPageData, votes, votingModules
}) {
  return {
    pageData: topicPageData, sessionVotes, votes, votingModules
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    voteUpdatedLocally: payload => dispatch(voteUpdatedLocally(payload)),
    voteUpdatedRemotely: updatedVoteData => dispatch(voteUpdatedRemotely(updatedVoteData)),
    fetchCacheBustedVoteData: () => dispatch(fetchTopicCacheBustedVoteData()),
    fetchCacheBustedVoteDataSuccess: payload => dispatch(
        fetchTopicCacheBustedVoteDataSuccess(payload)),
    fetchCacheBustedVoteDataError: () => dispatch(fetchTopicCacheBustedVoteDataError()),
    fetchPageData: () => dispatch(fetchTopicPageData()),
    fetchPageDataSuccess: payload => dispatch(fetchTopicPageDataSuccess(payload)),
    fetchPageDataError: () => dispatch(fetchPageDataError()),
    flushPageData: () => dispatch(flushPageData()),
    analyticsCategoryPostVoteSocialShareAction: (article, platform) => dispatch(
        analyticsCategoryPostVoteSocialShareAction(article, platform)),
    analyticsCategoryManualVoteAction: (article, type) => dispatch(
        analyticsCategoryManualVoteAction(article, type)),
    votingModuleUpdated: payload => dispatch(votingModuleUpdated(payload)),
    analyticsCallArticleLinkAction: () => dispatch(analyticsCallArticleLinkAction())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
