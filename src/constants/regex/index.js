export const EMAIL = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const ROUTE = {
  HOME: /^\/(\?[a-zA-Z0-9=&]*)$/,
  ABOUT: /^\/about([/]?|\?[a-zA-Z0-9=&]*)$/
};

export const ROUTE_DATA = {
  HOME_DATA: /homePageData/,
  ABOUT_DATA: /aboutPageData/
};
