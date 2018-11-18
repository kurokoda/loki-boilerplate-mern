import * as actions from "../votingModule";

describe("votingModule actions", () => {
  it("should create an action to update a voting module", () => {
    const payload = { slug: "article-slug" };
    const expectedAction = {
      type: actions.VOTING_MODULE_UPDATED,
      payload
    };
    expect(actions.votingModuleUpdated(payload)).toEqual(expectedAction);
  });
});
