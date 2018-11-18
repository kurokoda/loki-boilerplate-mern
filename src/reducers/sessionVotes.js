/** @module reducers/sessionVotes */

import Immutable from "immutable";
import { voteActions } from "../actions";

const defaultState = Immutable.fromJS({});

export default (state = defaultState, action) => {
  const { VOTE_UPDATED_LOCALLY } = voteActions;
  // TODO eliminate the need for these immutable hacks
  state = state.toJS ? state : Immutable.fromJS(state); // eslint-disable-line no-param-reassign
  switch (action.type) {
    case VOTE_UPDATED_LOCALLY:
      state = state.set(action.payload.slug, true);
      return state;
    default:
      return state;
  }
};
