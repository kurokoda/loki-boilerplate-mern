/** @module reducers/homePageData */
import Immutable from 'immutable';
import { loggingActions } from '../actions';

const defaultState = [];

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const { LOG } = loggingActions;
  switch (action.type) {
    case LOG:
      return state.push(action.payload);
    default:
      return state;
  }
};
