/** @module reducers/articlePageData */

import Immutable from "immutable";
import { pageActions, voteActions } from "../../actions";

const defaultState = null;

export default (state = defaultState, action) => {
  const {
    FETCH_ARTICLE_PAGE_DATA_SUCCESS,
    FETCH_ARTICLE_PAGE_DATA_ERROR,
    FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS,
    FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS,
    FLUSH_PAGE_DATA,
    HYDRATE_PAGE_DATA
  } = pageActions;
  const { VOTE_UPDATED_REMOTELY } = voteActions;

  let newState;

  switch (action.type) {
    case FETCH_ARTICLE_PAGE_DATA_SUCCESS:
      return Immutable.fromJS(action.payload);
    case FETCH_ARTICLE_PAGE_DATA_ERROR:
      return defaultState;
    case FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS:
      newState = state.setIn(
        ["articlePageData", "article", "dataViz"],
        action.payload.dataViz
      );
      return newState;
    case FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS:
      newState = state
        .setIn(
          ["articlePageData", "article", "voting", "yin", "score"],
          action.payload.vote.yin
        )
        .setIn(
          ["articlePageData", "article", "voting", "yang", "score"],
          action.payload.vote.yang
        );
      return newState;
    case FLUSH_PAGE_DATA:
      return defaultState;
    case HYDRATE_PAGE_DATA:
      if (action.payload.pageType === "article") {
        return Immutable.fromJS(action.payload.pageData);
      }
      return defaultState;
    case VOTE_UPDATED_REMOTELY:
      if (state) {
        newState = state
          .setIn(
            ["articlePageData", "article", "voting", "yin", "score"],
            action.payload.vote.yin
          )
          .setIn(
            ["articlePageData", "article", "voting", "yang", "score"],
            action.payload.vote.yang
          );
        return newState;
      }
      return state;
    default:
      return state;
  }
};
