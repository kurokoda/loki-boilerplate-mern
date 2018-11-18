import * as actions from "../votes";

describe("votes actions", () => {
  it("should create an action to update a vote locally", () => {
    const payload = { slug: "slug", faction: "faction" };
    const expectedAction = {
      type: actions.VOTE_UPDATED_LOCALLY,
      payload
    };
    expect(actions.voteUpdatedLocally(payload)).toEqual(expectedAction);
  });

  it("should create an action to update a vote remotely", () => {
    const payload = { foo: "foo" };
    const expectedAction = {
      type: actions.VOTE_UPDATED_REMOTELY,
      payload
    };
    expect(actions.voteUpdatedRemotely(payload)).toEqual(expectedAction);
  });
});
