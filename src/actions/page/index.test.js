import * as actions from "../page";

describe("page actions", () => {
  it("should create an action to fetch data for the home page", () => {
    const expectedAction = {
      type: actions.FETCH_HOME_PAGE_DATA
    };
    expect(actions.fetchHomePageData()).toEqual(expectedAction);
  });

  it("should create an action to report home page data fetching success", () => {
    const payload = { data: "data" };
    const expectedAction = {
      type: actions.FETCH_HOME_PAGE_DATA_SUCCESS,
      payload
    };
    expect(actions.fetchHomePageDataSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to fetch data for the topic page", () => {
    const expectedAction = {
      type: actions.FETCH_TOPIC_PAGE_DATA
    };
    expect(actions.fetchTopicPageData()).toEqual(expectedAction);
  });

  it("should create an action to report topic page data fetching success", () => {
    const payload = { data: "data" };
    const expectedAction = {
      type: actions.FETCH_TOPIC_PAGE_DATA_SUCCESS,
      payload
    };
    expect(actions.fetchTopicPageDataSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to fetch cachebusting data for the topic page", () => {
    const expectedAction = {
      type: actions.FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA
    };
    expect(actions.fetchTopicCacheBustedVoteData()).toEqual(expectedAction);
  });

  it("should create an action to report topic page cachebusted data fetching success", () => {
    const payload = { data: "data" };
    const expectedAction = {
      type: actions.FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS,
      payload
    };
    expect(actions.fetchTopicCacheBustedVoteDataSuccess(payload)).toEqual(
      expectedAction
    );
  });

  it("should create an action to report topic page cachebusted data fetching failure", () => {
    const error = "error";
    const expectedAction = {
      type: actions.FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_ERROR
    };
    expect(actions.fetchTopicCacheBustedVoteDataError()).toEqual(
      expectedAction
    );
  });

  it("should create an action to fetch data for the article page", () => {
    const expectedAction = {
      type: actions.FETCH_ARTICLE_PAGE_DATA
    };
    expect(actions.fetchArticlePageData()).toEqual(expectedAction);
  });

  it("should create an action to report article page data fetching success", () => {
    const payload = { data: "data" };
    const expectedAction = {
      type: actions.FETCH_ARTICLE_PAGE_DATA_SUCCESS,
      payload
    };
    expect(actions.fetchArticlePageDataSuccess(payload)).toEqual(
      expectedAction
    );
  });

  it("should create an action to fetch data for the result page", () => {
    const expectedAction = {
      type: actions.FETCH_RESULT_PAGE_DATA
    };
    expect(actions.fetchResultPageData()).toEqual(expectedAction);
  });

  it("should create an action to report result page data fetching success", () => {
    const payload = { data: "data" };
    const expectedAction = {
      type: actions.FETCH_RESULT_PAGE_DATA_SUCCESS,
      payload
    };
    expect(actions.fetchResultPageDataSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to report page data fetching failure", () => {
    const expectedAction = {
      type: actions.FETCH_PAGE_DATA_ERROR
    };
    expect(actions.fetchPageDataError()).toEqual(expectedAction);
  });

  it("should create an action to fetch data for the result page", () => {
    const expectedAction = {
      type: actions.FLUSH_PAGE_DATA
    };
    expect(actions.flushPageData()).toEqual(expectedAction);
  });

  it("should create an action to report result page data fetching success", () => {
    const pageType = "pageType";
    const pageData = {};
    const expectedAction = {
      type: actions.HYDRATE_PAGE_DATA,
      payload: { pageType, pageData }
    };
    expect(actions.hydratePageData(pageType, pageData)).toEqual(expectedAction);
  });
});
