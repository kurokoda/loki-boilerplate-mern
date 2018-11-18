export const CATEGORIES = /(culture|entertainment|politics|sports)/;

// TODO Can we add the trailing to the Categories above and reduce it to 1 constant
// Differentiate between categories keys used as tokens and categories keys that could appear in an aritcle slug
export const CATEGORIES_WITH_TRAILING_SLASH = /(culture|entertainment|politics|sports)\//;

export const EMAIL = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const ROUTE = {
  ARTICLE_PAGE: /^\/(culture|entertainment|politics|sports)\/[a-zA-Z0-9-]*([/]?|\?[a-zA-Z0-9=&]*)$/,
  ARTICLE_PAGE_DATA: /articlePageData/,
  HOME_PAGE: /^\/(\?[a-zA-Z0-9=&]*)$/,
  HOME_PAGE_DATA: /articlesPageData/,
  RESULTS_PAGE: /^\/(results)([/]?|\?[a-zA-Z0-9=&]*)$/,
  RESULTS_PAGE_DATA: /resultsPageData/,
  TOPIC_PAGE: /^\/(culture|entertainment|politics|sports)([/]?|\?[a-zA-Z0-9=&]*)$/,
  TOPIC_PAGE_DATA: /topicPageData/,
  POST_VOTE_DATA: /^\/votes/
};
