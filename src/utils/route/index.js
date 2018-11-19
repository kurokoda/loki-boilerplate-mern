import fetch from 'node-fetch';
import * as CONFIG from './config';

export const ROUTES = [
  CONFIG.ABOUT,
  CONFIG.FEATURE,
  CONFIG.FEATURES,
  CONFIG.HOME,
  CONFIG.PASSWORD_REQUEST,
  CONFIG.PASSWORD_RESET,
  CONFIG.WELCOME
];

export const getConfigForType = type =>
    ROUTES.find(config => config.type === type);

export const getConfigForRoute = url =>
  ROUTES.find(config => config.path === url);

export const getPageDataForRoute = url => {
  return fetch(url)
    .then(
      response =>
        response.ok
          ? Promise.resolve(response.json())
          : Promise.reject(
              `ERROR (getPageDataForRoute): unknown route = ${url}`
            )
    )
    .then(payload => Promise.resolve(payload))
    .catch(error => Promise.reject(error));
};
