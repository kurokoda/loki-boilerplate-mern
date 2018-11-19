export const googleAnalyticsEventsMap = {};

export const googleTagManagerEventsMap = {
  PAGE_VIEW: pageView
};

export function callAnalyticAction(type, payload = {}) {
  return { type, payload };
}

function pageView() {
  const hitType = 'pageview';
  return { hitType };
}

// TODO implement this in pages
// callAnalyticAction(AnalyticActions.PAGE_VIEW);
