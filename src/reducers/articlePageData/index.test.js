import Immutable from "immutable";
import { pageActions as actions } from "../../actions";
import reducer from "../articlePageData";

describe("article page data reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it("should handle FETCH_ARTICLE_PAGE_DATA_SUCCESS", () => {
    const payload = { data: "data" };
    expect(
      reducer([], {
        type: actions.FETCH_ARTICLE_PAGE_DATA_SUCCESS,
        payload
      })
    ).toEqual(Immutable.fromJS(payload));
  });
});
