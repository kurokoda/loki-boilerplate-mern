/** @module reducers/homePageData */
import Immutable from 'immutable';
import { themeActions } from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const { HYDRATE_THEME_DATA } = themeActions;
  switch (action.type) {
    case HYDRATE_THEME_DATA:
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
};
