/** @module reducers/votes */

import Immutable from "immutable";
import { voteActions } from "../actions";

const { VOTE_UPDATED_REMOTELY, VOTE_UPDATED_LOCALLY } = voteActions;
const defaultState = Immutable.fromJS({});

export default function(state = defaultState, action) {
  switch (action.type) {
    case VOTE_UPDATED_REMOTELY:
      return state;
    case VOTE_UPDATED_LOCALLY:
      return state.merge({ [action.payload.slug]: action.payload.faction });
    case "persist/REHYDRATE":
      return action.payload
        ? Immutable.fromJS(action.payload.votes)
        : defaultState;
    default:
      return state;
  }
}
