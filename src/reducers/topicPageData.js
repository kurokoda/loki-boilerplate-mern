/** @module reducers/topicPageData */

/* eslint-disable no-param-reassign */

import Immutable from "immutable";
import { pageActions, voteActions } from "../actions";

const defaultState = null;

export default (state = defaultState, action) => {
  const {
    FETCH_TOPIC_PAGE_DATA_SUCCESS,
    FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS,
    FLUSH_PAGE_DATA,
    HYDRATE_PAGE_DATA
  } = pageActions;
  const { VOTE_UPDATED_REMOTELY } = voteActions;
  switch (action.type) {
    case FETCH_TOPIC_PAGE_DATA_SUCCESS:
      return Immutable.fromJS(action.payload);
    case FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS:
      if (state) {
        let articles = state.getIn(["articlePageData", "articles"]);
        action.payload.forEach(obj => {
          articles = articles.update(
            articles.findIndex(item => item.get("slug") === obj.vote.slug),
            item => {
              if (item.get("voting")) {
                item = item.setIn(["voting", "yin", "score"], obj.vote.yin);
                item = item.setIn(["voting", "yang", "score"], obj.vote.yang);
              }
              return item;
            }
          );
        });
        state = state.setIn(["articlePageData", "articles"], articles);
      }
      return state;
    case VOTE_UPDATED_REMOTELY:
      if (state) {
        let articles = state.getIn(["articlePageData", "articles"]);
        articles = articles.update(
          articles.findIndex(
            item => item.get("slug") === action.payload.vote.slug
          ),
          item => {
            if (item.get("voting")) {
              item = item.setIn(
                ["voting", "yin", "score"],
                action.payload.vote.yin
              );
              item = item.setIn(
                ["voting", "yang", "score"],
                action.payload.vote.yang
              );
            }
            return item;
          }
        );
        state = state.setIn(["articlePageData", "articles"], articles);
      }
      return state;
    case FLUSH_PAGE_DATA:
      return defaultState;
    case HYDRATE_PAGE_DATA:
      if (action.payload.pageType === "topic") {
        return Immutable.fromJS(action.payload.pageData);
      }
      return defaultState;
    default:
      return state;
  }
};
