/** @module reducers/homePageData */
import Immutable from 'immutable';
import { modalActions } from '../actions';

const defaultState = null;

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const { MODAL_SHOW, MODAL_HIDE } = modalActions;
  switch (action.type) {
    case MODAL_HIDE:
      return null;
    case MODAL_SHOW:
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
};
