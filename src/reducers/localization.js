/** @module reducers/homePageData */
import Immutable from 'immutable';
import { localizationActions } from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const { HYDRATE_LOCALIZATION_DATA } = localizationActions;
  switch (action.type) {
    case HYDRATE_LOCALIZATION_DATA:
      return Immutable.fromJS(JSON.parse(action.payload));
    default:
      return state;
  }
};
