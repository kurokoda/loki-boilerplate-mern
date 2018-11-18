import fetch from "node-fetch";
import qs from "qs";
import {
  CATEGORIES,
  ROUTE as ROUTE_REGEX,
  CATEGORIES_WITH_TRAILING_SLASH
} from "../../constants/regex";
import ROUTE_STRING from "../../constants/route";

const baseUrl =
  process.env.REACT_APP_TYLT_API_BASE_URL ||
  `https://api.${process.env.REACT_APP_NAMESPACE}.kubernetes.thetylt.com`;

export const getArticlePageDataUrl = slug =>
  `${baseUrl}/v3/articlePageData/${slug}?build=${
    process.env.REACT_APP_BUILDNUMBER
  }`;

// TODO add this to article page data
export const getArticleCachebustedVoteDataUrl = slug =>
  `${baseUrl}/v3/articlePageData/${slug}?filter=votes&cacheBuster=${Math.floor(
    Math.random() * 1000000000
  )}`;

export const getArticleCachebustedDatavizDataUrl = slug =>
  `${baseUrl}/v3/articlePageData/${slug}?filter=dataviz&cacheBuster=${Math.floor(
    Math.random() * 1000000000
  )}`;

export const getHomePageDataUrl = () =>
  `${baseUrl}/v3/articlesPageData?build=${process.env.REACT_APP_BUILDNUMBER}`;

export const getResultPageDataUrl = page =>
  `${baseUrl}/v3/resultsPageData?page=${page}&build=${
    process.env.REACT_APP_BUILDNUMBER
  }`;

export const getTopicCacheBustedVoteDataUrl = (topic, page) =>
  `${baseUrl}/v3/topicPageData/${topic}?page=${page}&filter=votes&cacheBuster=${Math.floor(
    Math.random() * 1000000000
  )}`;

export const getTopicPageDataUrl = (topic, page) =>
  `${
    process.env.REACT_APP_TYLT_API_BASE_URL
  }/v3/topicPageData/${topic}?page=${page}&build=${
    process.env.REACT_APP_BUILDNUMBER
  }`;

export const getVoteDataUrl = () => `${baseUrl}/votes`;

// TODO is this a duplicate of `getPageTypeForRoute`, below?
export const getApiUrlRouteType = url => {
  let result;
  if (ROUTE_REGEX.ARTICLE_PAGE_DATA.test(url)) {
    result = ROUTE_STRING.ARTICLE;
  } else if (ROUTE_REGEX.HOME_PAGE_DATA.test(url)) {
    result = ROUTE_STRING.HOME;
  } else if (ROUTE_REGEX.RESULTS_PAGE_DATA.test(url)) {
    result = ROUTE_STRING.RESULT;
  } else if (ROUTE_REGEX.TOPIC_PAGE_DATA.test(url)) {
    result = ROUTE_STRING.TOPIC;
  } else if (ROUTE_REGEX.POST_VOTE_DATA.test(url)) {
    result = ROUTE_STRING.POST_VOTE;
  } else {
    throw Error(`TYLT ERROR (getApiUrlRouteType): unknown route = ${url}`);
  }

  console.log(
    `TYLT ERROR (getApiUrlRouteType): unknown route = ${url}, result = ${result}`
  );
  return result;
};

export const extractArticleSlugFromUrl = url =>
  url
    .split(CATEGORIES_WITH_TRAILING_SLASH)[2]
    .split("?")[0]
    .replace("/", "");

export const getApiUrlForRoute = url => {
  const isHomeRoute = ROUTE_REGEX.HOME_PAGE.test(url);
  const isTopicRoute = ROUTE_REGEX.TOPIC_PAGE.test(url);
  const isArticleRoute = ROUTE_REGEX.ARTICLE_PAGE.test(url);
  const isResultRoute = ROUTE_REGEX.RESULTS_PAGE.test(url);

  let result;
  if (isHomeRoute) {
    result = Promise.resolve(getHomePageDataUrl());
  } else if (isTopicRoute) {
    const queryString = qs.parse(url.split("?")[1]);
    const page = queryString.page || 1;
    const topic = url.match(CATEGORIES) && url.match(CATEGORIES)[0];
    result = Promise.resolve(getTopicPageDataUrl(topic, page));
  } else if (isArticleRoute) {
    const slug = extractArticleSlugFromUrl(url);
    result = Promise.resolve(getArticlePageDataUrl(slug));
  } else if (isResultRoute) {
    const queryString = qs.parse(url.split("?")[1]);
    const page = queryString.page || 1;
    result = Promise.resolve(getResultPageDataUrl(page));
  } else {
    result = Promise.reject(
      `TYLT ERROR (getApiUrlForRoute): unknown route = ${url}`
    );
  }

  console.log("the result of getApiUrlForRoute is", result);
  return result
    ? Promise.resolve(result)
    : Promise.reject(
        `TYLT ERROR (getApiUrlForRoute): unknown route = ${url}, result = ${result}`
      );
};

export const getPageTypeForRoute = url => {
  const isHomeRoute = ROUTE_REGEX.HOME_PAGE.test(url);
  const isTopicRoute = ROUTE_REGEX.TOPIC_PAGE.test(url);
  const isArticleRoute = ROUTE_REGEX.ARTICLE_PAGE.test(url);
  const isResultRoute = ROUTE_REGEX.RESULTS_PAGE.test(url);

  console.log("getPageTypeForRoute:", url);

  let result;
  if (isHomeRoute) {
    result = "home";
  } else if (isTopicRoute) {
    result = "topic";
  } else if (isArticleRoute) {
    result = "article";
  } else if (isResultRoute) {
    result = "result";
  }

  return result
    ? result
    : Promise.reject(
        `TYLT ERROR (getPageTypeForRoute): unknown route = ${url}, result = ${result}`
      );
};

export const getPageDataForRoute = url =>
  fetch(url)
    .then(
      response =>
        response.ok
          ? Promise.resolve(response.json())
          : Promise.reject(
              `TYLT ERROR (getPageDataForRoute): unknown route = ${url}`
            )
    )
    .then(payload => Promise.resolve(payload))
    .catch(error => Promise.reject(error));
