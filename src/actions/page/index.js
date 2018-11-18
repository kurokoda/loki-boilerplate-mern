export const FETCH_HOME_PAGE_DATA = "FETCH_HOME_PAGE_DATA";
export const FETCH_HOME_PAGE_DATA_SUCCESS = "FETCH_HOME_PAGE_DATA_SUCCESS";
export const FETCH_TOPIC_PAGE_DATA = "FETCH_TOPIC_PAGE_DATA";
export const FETCH_TOPIC_PAGE_DATA_SUCCESS = "FETCH_TOPIC_PAGE_DATA_SUCCESS";
export const FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA =
  "FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA";
export const FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS =
  "FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS";
export const FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_ERROR =
  "FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_ERROR";
export const FETCH_ARTICLE_PAGE_DATA = "FETCH_ARTICLE_PAGE_DATA";
export const FETCH_ARTICLE_PAGE_DATA_SUCCESS =
  "FETCH_ARTICLE_PAGE_DATA_SUCCESS";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_ERROR =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_ERROR";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS";
export const FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_ERROR =
  "FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_ERROR";
export const FETCH_RESULT_PAGE_DATA_SUCCESS = "FETCH_RESULT_PAGE_DATA_SUCCESS";
export const FETCH_RESULT_PAGE_DATA = "FETCH_RESULT_PAGE_DATA";
export const FETCH_PAGE_DATA_ERROR = "FETCH_PAGE_DATA_ERROR";
export const FLUSH_PAGE_DATA = "FLUSH_PAGE_DATA";
export const HYDRATE_PAGE_DATA = "HYDRATE_PAGE_DATA";

/**
 * Action dispatched when article page data fetch is requested
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_DATA`
 */
export function fetchArticlePageData() {
  return {
    type: FETCH_ARTICLE_PAGE_DATA
  };
}

/**
 * Action dispatched when article page data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_DATA_SUCCESS`
 */

export function fetchArticlePageDataSuccess(payload) {
  return {
    type: FETCH_ARTICLE_PAGE_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when article page cachebusted vote data fetch is requested
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA`
 */
export function fetchArticlePageCachebustedDatavizData() {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA
  };
}

/**
 * Action dispatched when article page cachebusted dataviz data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS`
 */
export function fetchArticlePageCachebustedDatavizDataSuccess(payload) {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when article page cachebusted dataviz data fetch is unsuccessful
 * @param {string} error The response's error message
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_ERROR`
 */
export function fetchArticlePageCachebustedDatavizDataError(error) {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_DATAVIZ_DATA_ERROR,
    error
  };
}

/**
 * Action dispatched when article page cachebusted vote data fetch is requested
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA`
 */
export function fetchArticlePageCachebustedVoteData() {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA
  };
}

/**
 * Action dispatched when article page cachebusted vote data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS`
 */
export function fetchArticlePageCachebustedVoteDataSuccess(payload) {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when article page cachebusted vote data fetch is unsuccessful
 * @param {string} error The response's error message
 * @returns {object} article of type `FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_ERROR`
 */
export function fetchArticlePageCachebustedVoteDataError(error) {
  return {
    type: FETCH_ARTICLE_PAGE_CACHEBUSTED_VOTE_DATA_ERROR,
    error
  };
}

/**
 * Action dispatched when home page data fetch is requested
 * @returns {object} article of type `FETCH_HOME_PAGE_DATA`
 */
export function fetchHomePageData() {
  return {
    type: FETCH_HOME_PAGE_DATA
  };
}

/**
 * Action dispatched when home page data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_HOME_PAGE_DATA_SUCCESS`
 */
export function fetchHomePageDataSuccess(payload) {
  return {
    type: FETCH_HOME_PAGE_DATA_SUCCESS,
    payload
  };
}

/**
 * @param {string} error The response error
 * @returns {object} article of type `FETCH_PAGE_DATA_ERROR`
 */
export function fetchPageDataError(error) {
  return {
    type: FETCH_PAGE_DATA_ERROR,
    error
  };
}

/**
 * Action dispatched when topic page data fetch is requested
 * @returns {object} article of type `FETCH_TOPIC_PAGE_DATA`
 */
export function fetchTopicPageData() {
  return {
    type: FETCH_TOPIC_PAGE_DATA
  };
}

/**
 * Action dispatched when topic page data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_TOPIC_PAGE_DATA_SUCCESS`
 */
export function fetchTopicPageDataSuccess(payload) {
  return {
    type: FETCH_TOPIC_PAGE_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when topic page cachebusted data fetch is requested
 * @returns {object} article of type `FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA`
 */
export function fetchTopicCacheBustedVoteData() {
  return {
    type: FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA
  };
}

/**
 * Action dispatched when topic page cachebusted data fetch is successful
 * @param {object} payload The response's data
 * @returns {object} article of type `FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS`
 */
export function fetchTopicCacheBustedVoteDataSuccess(payload) {
  return {
    type: FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when topic page cachebusted data fetch is unsuccessful
 * @returns {object} article of type `FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_ERROR`
 */
export function fetchTopicCacheBustedVoteDataError() {
  return {
    type: FETCH_TOPIC_CACHE_BUSTED_VOTE_DATA_ERROR
  };
}

/**
 * Action dispatched when result page data fetch is requested
 * @returns {object} article of type `FETCH_RESULT_PAGE_DATA`
 */
export function fetchResultPageData() {
  return {
    type: FETCH_RESULT_PAGE_DATA
  };
}

/**
 * Action dispatched when result page data fetch is successful
 * @returns {object} article of type `FETCH_RESULT_PAGE_DATA_SUCCESS`
 */
export function fetchResultPageDataSuccess(payload) {
  return {
    type: FETCH_RESULT_PAGE_DATA_SUCCESS,
    payload
  };
}

/**
 * Action dispatched when page data rehydration is ready
 * @param {string} pageType The response's data
 * @param {object} pageData The response's data
 * @returns {object} article of type `HYDRATE_PAGE_DATA`
 */
export function hydratePageData(pageType, pageData) {
  const type = HYDRATE_PAGE_DATA;
  const payload = { pageType, pageData };

  return {
    type,
    payload
  };
}

/**
 * Action dispatched when page data flushing is requested

 * @returns {object} article of type `FLUSH_PAGE_DATA`
 */
export function flushPageData() {
  return { type: FLUSH_PAGE_DATA };
}
