/** @module reducers/votingModules */

import Immutable from "immutable";
import { votingModuleActions } from "../actions";

const { VOTING_MODULE_UPDATED } = votingModuleActions;
const defaultState = Immutable.fromJS({});

let votingModules;

export default function(state = defaultState, action) {
  switch (action.type) {
    case VOTING_MODULE_UPDATED:
      return state.merge({ [action.payload.slug]: { initialized: true } });
    case "persist/REHYDRATE":
      if (action.payload && action.payload.votes) {
        votingModules = action.payload.votes.toJS
          ? action.payload.votes.toJS()
          : action.payload.votes;
        for (const key of Object.keys(votingModules)) {
          if (key.indexOf("_") === -1) {
            votingModules[key] = { initialized: true };
          }
        }
      }
      return action.payload ? Immutable.fromJS(votingModules) : defaultState;
    default:
      return state;
  }
}
