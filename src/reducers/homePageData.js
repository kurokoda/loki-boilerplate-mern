/** @module reducers/homePageData */

import Immutable from "immutable";
import { pageActions } from "../actions";

const defaultState = null;

export default (state = defaultState, action) => {
  const {
    FETCH_HOME_PAGE_DATA_SUCCESS,
    FETCH_PAGE_DATA_ERROR,
    FLUSH_PAGE_DATA,
    HYDRATE_PAGE_DATA
  } = pageActions;
  switch (action.type) {
    case FETCH_HOME_PAGE_DATA_SUCCESS:
      return Immutable.fromJS(action.payload);
    case FETCH_PAGE_DATA_ERROR:
      return state;
    case FLUSH_PAGE_DATA:
      return defaultState;
    case HYDRATE_PAGE_DATA:
      if (action.payload.pageType === "home") {
        return Immutable.fromJS(action.payload.pageData);
      }
      return defaultState;
    default:
      return state;
  }
};
