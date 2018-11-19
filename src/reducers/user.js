/** @module reducers/homePageData */

import Immutable from 'immutable';
import { userActions } from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const {
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SIGN_UP,
    SIGN_UP_ERROR,
    SIGN_UP_SUCCESS
  } = userActions;
  switch (action.type) {
    case SIGN_IN:
    case SIGN_IN_ERROR:
    case SIGN_UP:
    case SIGN_UP_ERROR:
    case SIGN_UP_SUCCESS:
      return state;
    case SIGN_IN_SUCCESS:
      return Immutable.fromJS(action.payload);
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
};
