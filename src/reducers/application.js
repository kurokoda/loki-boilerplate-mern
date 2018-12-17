/** @module reducers/homePageData */
import Immutable from 'immutable';
import { applicationActions } from '../actions';

const defaultState = Immutable.fromJS({
  isCollapseHeaderMenuOpen: false
});

export default (state = defaultState, action) => {
  // TODO SSR data hydration gives us POJOs as initial objects. This casting is messy. Remove ASAP.
  if (state && !state.toJS) {
    state = Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  }
  const { SET_COLLAPSED_HEADER_MENU_OPEN } = applicationActions;
  switch (action.type) {
    case SET_COLLAPSED_HEADER_MENU_OPEN:
      return state.merge({ isCollapseHeaderMenuOpen: action.payload.isCollapseHeaderMenuOpen });
    default:
      return state;
  }
};
