export const VOTING_MODULE_UPDATED = "VOTING_MODULE_UPDATED";

/**
 * Action dispatched when a voting module is updated. Currently used to track
 * if the user has voted on a Tylt in order to prevent unnecessary vote meter
 * animations
 * @param {object} payload The voting module data
 * @returns {object} article of type `VOTING_MODULE_UPDATED`
 */
export function votingModuleUpdated(payload) {
  return {
    type: VOTING_MODULE_UPDATED, payload
  };
}
