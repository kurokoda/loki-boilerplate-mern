import fetch from 'node-fetch';
import AboutContainer from '../../container/page/about';
import FeatureContainer from '../../container/page/feature';
import FeaturesContainer from '../../container/page/features';
import HomeContainer from '../../container/page/home';
import PasswordResetContainer from '../../container/page/passwordReset';
import PasswordRequestContainer from '../../container/page/passwordRequest';
import WelcomeContainer from '../../container/page/welcome';

import AboutComponent from '../../component/page/about';
import FeatureComponent from '../../component/page/feature';
import FeaturesComponent from '../../component/page/features';
import HomeComponent from '../../component/page/home';
import PasswordResetComponent from '../../component/page/passwordReset';
import PasswordRequestComponent from '../../component/page/passwordRequest';
import WelcomeComponent from '../../component/page/welcome';

export const getConfigForType = type =>
  ROUTES.find(config =>config.type === type);

export const getConfigForRoute = url =>
  ROUTES.find(config => url.match(config.regex));

export const getDataParamsForRoute = url => {
  if (url.match(FEATURE.regex)){
   const id = url.split('/')[2].split('?')[0];
   return { id };
  }

  return null;
};

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

export const ABOUT = {
  getPageRoute: () => '/about',
  container: AboutContainer,
  component: AboutComponent,
  camelCaseKey: 'about',
  navMenu: 'always',
  path: '/about',
  regex: /\/about/,
  type: 'about'
};

export const FEATURE = {
  getPageRoute: (params) => `/feature/${params.id}`,
  getDataRoute: (params) => `/api/page/feature/${params.id}`,
  container: FeatureContainer,
  component: FeatureComponent,
  camelCaseKey: 'feature',
  navMenu: 'never',
  path: '/feature/:id',
  regex: /\/feature\//,
  type: 'feature'
};

export const FEATURES = {
  getPageRoute: () => '/features',
  getDataRoute: () => '/api/page/features',
  container: FeaturesContainer,
  component: FeaturesComponent,
  camelCaseKey: 'features',
  navMenu: 'always',
  path: '/features',
  regex: /\/features/,
  type: 'features'
};

export const HOME = {
  getPageRoute: () => '/',
  container: HomeContainer,
  component: HomeComponent,
  exact: true,
  camelCaseKey: 'home',
  navMenu: 'never',
  path: '/',
  regex: /\//,
  type: 'home'
};

export const PASSWORD_RESET = {
  getPageRoute: () => '/password-reset',
  container: PasswordResetContainer,
  component: PasswordResetComponent,
  camelCaseKey: 'passwordReset',
  navMenu: 'never',
  path: '/password-reset',
  regex: /\/password-reset/,
  type: 'password-reset'
};

export const PASSWORD_REQUEST = {
  getPageRoute: params => '/password-request',
  container: PasswordRequestContainer,
  component: PasswordRequestComponent,
  camelCaseKey: 'passwordRequest',
  navMenu: 'never',
  path: '/password-request',
  regex: /\/password-request/,
  type: 'password-request'
};

export const WELCOME = {
  getPageRoute: () => '/welcome',
  container: WelcomeContainer,
  component: WelcomeComponent,
  camelCaseKey: 'welcome',
  navMenu: 'user',
  path: '/welcome',
  regex: /\/welcome/,
  type: 'welcome'
};

export const ROUTES = [
  ABOUT,
  FEATURE,
  FEATURES,
  HOME,
  PASSWORD_REQUEST,
  PASSWORD_RESET,
  WELCOME
];