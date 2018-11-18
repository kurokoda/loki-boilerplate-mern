import Immutable from "immutable";

export const AnalyticActions = {
  LOCATION_CHANGE: "LOCATION_CHANGE",
  HAMBURGER_CLICK: "HAMBURGER_CLICK",
  GRID_ARTICLE_CLICK: "GRID_ARTICLE_CLICK",
  ARTICLE_SWIPE: "ARTICLE_SWIPE",
  MORE_FROM_TYLT_CLICK: "MORE_FROM_TYLT_CLICK",
  NAV_LINK_CLICK: "NAV_LINK_CLICK",
  TYLT_LOGO_CLICK: "TYLT_LOGO_CLICK",
  BACK_TO_TOP_CLICK: "BACK_TO_TOP_CLICK",
  SOCIAL_PROFILE_CLICK: "SOCIAL_PROFILE_CLICK",
  FOOTER_SOCIAL_PROFILE_CLICK: "FOOTER_SOCIAL_PROFILE_CLICK",
  GENERIC_SOCIAL_SHARE_CLICK: "GENERIC_SOCIAL_SHARE_CLICK",
  POST_VOTE_SOCIAL_SHARE_CLICK: "POST_VOTE_SOCIAL_SHARE_CLICK",
  MANUAL_VOTE: "MANUAL_VOTE",
  OPTINMONSTER_LOAD: "OPTINMONSTER_LOAD",
  ARTICLE_METADATA_UPLOAD: "ARTICLE_METADATA_UPLOAD",
  ARTICLE_METADATA_CLEAR: "ARTICLE_METADATA_CLEAR"
};

export const googleAnalyticsEventsMap = {};

export const googleTagManagerEventsMap = {
  LOCATION_CHANGE: locationChange,
  HAMBURGER_CLICK: hamburgerAction,
  GRID_ARTICLE_CLICK: gridArticleAction,
  ARTICLE_SWIPE: articleSwipeAction,
  MORE_FROM_TYLT_CLICK: moreFromTyltAction,
  NAV_LINK_CLICK: navLinkAction,
  TYLT_LOGO_CLICK: tyltLogoAction,
  BACK_TO_TOP_CLICK: backToTopAction,
  SOCIAL_PROFILE_CLICK: socialProfileAction,
  FOOTER_SOCIAL_PROFILE_CLICK: footerSocialProfileAction,
  GENERIC_SOCIAL_SHARE_CLICK: genericSocialShareAction,
  POST_VOTE_SOCIAL_SHARE_CLICK: postVoteSocialShareAction,
  MANUAL_VOTE: manualVoteAction,
  OPTINMONSTER_LOAD: optinmonsterAction,
  ARTICLE_METADATA_UPLOAD: buildArticleMetadata,
  ARTICLE_METADATA_CLEAR: clearArticleMetadata
};

export function callAnalyticAction(type, payload = {}) {
  return { type, payload };
}

function locationChange() {
  const hitType = "pageview";
  return { hitType };
}

function hamburgerAction() {
  const hitType = "hamburger-click";

  return { hitType };
}

function gridArticleAction() {
  const hitType = "article-link-click";

  return { hitType };
}

function articleSwipeAction(action) {
  const hitType = "swipe";
  const direction = action.payload.direction;

  const article = action.payload.article;

  const articleAuthor = article.get("author");
  const articleTopic = article.get("topic");
  const articlePosition = action.payload.position;
  const swipedArticleAuthor = articleAuthor;
  const swipedArticleTopic = articleTopic;
  const swipedArticlePosition = articlePosition;

  return {
    hitType,
    direction,
    articleAuthor,
    articleTopic,
    articlePosition,
    swipedArticleAuthor,
    swipedArticleTopic,
    swipedArticlePosition
  };
}

function moreFromTyltAction(action) {
  const hitType = "more-from-the-tylt";

  const relatedArticle = action.payload.relatedArticle;

  const relatedArticleAuthor = relatedArticle.get("author");
  const relatedArticleTopic = relatedArticle.get("topic");
  const relatedArticlePosition = action.payload.position;

  return {
    hitType,
    relatedArticleAuthor,
    relatedArticleTopic,
    relatedArticlePosition
  };
}

function navLinkAction(action) {
  const hitType = "nav-link-click";
  const navLocation = action.payload.navLocation;

  return { hitType, navLocation };
}

function tyltLogoAction() {
  const hitType = "tylt-logo-click";

  return { hitType };
}

function backToTopAction() {
  const hitType = "up-to-top-click";

  return { hitType };
}

function socialProfileAction(action) {
  const hitType = "social-profile-click";
  const page = action.payload.page;
  const platform = action.payload.platform;
  const networkProfile = platform;

  return { hitType, page, platform, networkProfile };
}

function footerSocialProfileAction(action) {
  const hitType = "footer-social-profile-click";
  const platform = action.payload.platform;

  return { hitType, platform };
}

function genericSocialShareAction(action) {
  const hitType = "article-share";
  const platform = action.payload.platform;
  const sharedTo = platform;

  return { hitType, platform, sharedTo };
}

function postVoteSocialShareAction(action) {
  const hitType = "post-manual-vote-share";
  const page = action.payload.page;
  const platform = action.payload.platform;
  const sharedTo = platform;

  const article = action.payload.article;

  const articleAuthor = article.get("author");
  const articleTopic = article.get("topic");
  const articleState = article.get("active") ? "active" : "closed";
  const articleDurationHours = article.get("durationHours");
  const articlePublishedAt = article.get("publishedAt");
  const articleSMCount = article.get("supportingMedia")
    ? article.get("supportingMedia").size
    : 0;
  const sharedAuthor = articleAuthor;
  const sharedTopic = articleTopic;

  return {
    hitType,
    page,
    platform,
    sharedTo,
    articleAuthor,
    articleTopic,
    articleState,
    articleDurationHours,
    articlePublishedAt,
    articleSMCount,
    sharedAuthor,
    sharedTopic
  };
}

function manualVoteAction(action) {
  const hitType = "manual-vote";
  const page = action.payload.page;
  const yinOrYang = action.payload.type;

  const article = action.payload.article;

  const articleAuthor = article.get("author");
  const articleTopic = article.get("topic");
  const articleState = article.get("active") ? "active" : "closed";
  const articleDurationHours = article.get("durationHours");
  const articlePublishedAt = article.get("publishedAt");
  const articleSMCount = article.get("supportingMedia")
    ? article.get("supportingMedia").size
    : 0;
  const votedArticleAuthor = articleAuthor;
  const votedArticleTopic = articleTopic;

  return {
    hitType,
    page,
    yinOrYang,
    articleAuthor,
    articleTopic,
    articleState,
    articleDurationHours,
    articlePublishedAt,
    articleSMCount,
    votedArticleAuthor,
    votedArticleTopic
  };
}

function optinmonsterAction() {
  const hitType = "optin-monster";

  return { hitType };
}

function buildArticleMetadata(action) {
  const article = Immutable.fromJS(action.payload.article);

  const articleAuthor = article.get("author");
  const articleTopic = article.get("topic");
  const articleState = article.get("active") ? "active" : "closed";
  const articleDurationHours = article.get("durationHours");
  const articlePublishedAt = article.get("publishedAt");
  const articleSMCount = article.get("supportingMedia")
    ? article.get("supportingMedia").size
    : 0;

  return {
    articleAuthor,
    articleTopic,
    articleState,
    articleDurationHours,
    articlePublishedAt,
    articleSMCount
  };
}

function clearArticleMetadata() {
  const articleAuthor = null;
  const articleTopic = null;
  const articleState = null;
  const articleDurationHours = null;
  const articlePublishedAt = null;
  const articleSMCount = null;

  return {
    articleAuthor,
    articleTopic,
    articleState,
    articleDurationHours,
    articlePublishedAt,
    articleSMCount
  };
}

// Application

export function pageView() {
  return callAnalyticAction(AnalyticActions.LOCATION_CHANGE);
}

export function hamburgerClick() {
  return callAnalyticAction(AnalyticActions.HAMBURGER_CLICK);
}

export function navLinkClick(location) {
  return callAnalyticAction(AnalyticActions.NAV_LINK_CLICK, {
    navLocation: location
  });
}

export function tyltLogoLinkClick() {
  return callAnalyticAction(AnalyticActions.TYLT_LOGO_CLICK);
}

export function analyticsBackToTopClick() {
  return callAnalyticAction(AnalyticActions.BACK_TO_TOP_CLICK);
}

export function analyticsFooterSocialProfileClick(platform) {
  return callAnalyticAction(AnalyticActions.FOOTER_SOCIAL_PROFILE_CLICK, {
    platform
  });
}

// Home

export function analyticsCallArticleLinkAction() {
  return callAnalyticAction(AnalyticActions.GRID_ARTICLE_CLICK);
}

export function analyticsClearArticleMetadata() {
  return callAnalyticAction(AnalyticActions.ARTICLE_METADATA_CLEAR);
}

export function analyticsCallArticleSwipeAction(article, direction, position) {
  return callAnalyticAction(AnalyticActions.ARTICLE_SWIPE, {
    article,
    direction,
    position
  });
}

export function analyticsCallSocialProfileAction(page, platform) {
  return callAnalyticAction(AnalyticActions.SOCIAL_PROFILE_CLICK, {
    page,
    platform
  });
}

export function analyticsHomepagePostVoteSocialShareAction(article, platform) {
  const page = "homepage";

  return callAnalyticAction(AnalyticActions.POST_VOTE_SOCIAL_SHARE_CLICK, {
    article,
    page,
    platform
  });
}

export function analyticsHomepageManualVoteAction(article, type) {
  const page = "homepage";

  return callAnalyticAction(AnalyticActions.MANUAL_VOTE, {
    article,
    page,
    type
  });
}

// Topic

export function analyticsCategoryPostVoteSocialShareAction(article, platform) {
  const page = "category";

  return callAnalyticAction(AnalyticActions.POST_VOTE_SOCIAL_SHARE_CLICK, {
    article,
    page,
    platform
  });
}

export function analyticsCategoryManualVoteAction(article, type) {
  const page = "category";

  return callAnalyticAction(AnalyticActions.MANUAL_VOTE, {
    article,
    page,
    type
  });
}

// Article

export function analyticsRelatedArticleAction(relatedArticle, position) {
  return callAnalyticAction(AnalyticActions.MORE_FROM_TYLT_CLICK, {
    relatedArticle,
    position
  });
}

export function analyticsGenericSocialShareAction(platform) {
  return callAnalyticAction(AnalyticActions.GENERIC_SOCIAL_SHARE_CLICK, {
    platform
  });
}

export function analyticsArticlePostVoteSocialShareAction(article, platform) {
  const page = "article";

  return callAnalyticAction(AnalyticActions.POST_VOTE_SOCIAL_SHARE_CLICK, {
    article,
    page,
    platform
  });
}

export function analyticsArticleManualVoteAction(article, type) {
  const page = "article";

  return callAnalyticAction(AnalyticActions.MANUAL_VOTE, {
    article,
    page,
    type
  });
}

export function analyticsOptinmonsterAction() {
  return callAnalyticAction(AnalyticActions.OPTINMONSTER_LOAD);
}

export function analyticsUploadArticleMetadata(article) {
  return callAnalyticAction(AnalyticActions.ARTICLE_METADATA_UPLOAD, {
    article
  });
}
