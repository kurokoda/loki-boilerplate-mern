export const isBrowserEnvironment =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement;

export const isServerEnvironment = !isBrowserEnvironment;
