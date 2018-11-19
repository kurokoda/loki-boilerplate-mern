/** @module reducers/topicPageData */

/* eslint-disable no-param-reassign */

import Immutable from 'immutable';
import { pageActions } from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const {
    FETCH_PAGE_DATA_SUCCESS,
    FLUSH_PAGE_DATA,
    HYDRATE_PAGE_DATA
  } = pageActions;
  switch (action.type) {
    case FETCH_PAGE_DATA_SUCCESS:
      return Immutable.fromJS(action.payload);
    case FLUSH_PAGE_DATA:
      return defaultState;
    case HYDRATE_PAGE_DATA:
      return Immutable.fromJS(action.payload.pageData);
    default:
      return state;
  }
};
