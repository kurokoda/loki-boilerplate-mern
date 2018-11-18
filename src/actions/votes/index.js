export const VOTE_UPDATED_LOCALLY = "VOTE_UPDATED_LOCALLY";
export const VOTE_UPDATED_REMOTELY = "VOTE_UPDATED_REMOTELY";

/**
 * Action dispatched when article page data fetch is successful
 * @param {object} payload The vote data
 * @returns {object} article of type `VOTE_UPDATED_LOCALLY`
 */
export function voteUpdatedLocally(payload) {
  return {
    type: VOTE_UPDATED_LOCALLY, payload
  };
}

/**
 * Action dispatched when article page data fetch is successful
 * @param {object} payload The result's vote data
 * @returns {object} article of type `VOTE_UPDATED_REMOTELY`
 */
export function voteUpdatedRemotely(payload) {
  return {
    type: VOTE_UPDATED_REMOTELY, payload
  };
}
