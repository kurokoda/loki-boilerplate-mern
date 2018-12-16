import AboutContainer from '../../../container/page/about';
import FeatureContainer from '../../../container/page/feature';
import FeaturesContainer from '../../../container/page/features';
import HomeContainer from '../../../container/page/home';
import PasswordResetContainer from '../../../container/page/passwordReset';
import PasswordRequestContainer from '../../../container/page/passwordRequest';
import WelcomeContainer from '../../../container/page/welcome';

export const ABOUT = {
  api: {
    pageData: '/api/page/about'
  },
  component: AboutContainer,
  camelCaseKey: 'about',
  navMenu: 'always',
  path: '/about',
  type: 'about'
};

export const FEATURE = {
  api: {
    pageData: '/api/page/feature'
  },
  component: FeatureContainer,
  camelCaseKey: 'feature',
  navMenu: 'never',
  path: '/feature',
  type: 'feature'
};

export const FEATURES = {
  api: {
    pageData: '/api/page/features'
  },
  component: FeaturesContainer,
  camelCaseKey: 'features',
  navMenu: 'always',
  path: '/features',
  type: 'features'
};

export const HOME = {
  api: {
    pageData: '/api/page/home'
  },
  component: HomeContainer,
  exact: true,
  camelCaseKey: 'home',
  navMenu: 'never',
  path: '/',
  type: 'home'
};

export const PASSWORD_RESET = {
  component: PasswordResetContainer,
  camelCaseKey: 'passwordReset',
  navMenu: 'never',
  path: '/password-reset',
  type: 'password-reset'
};

export const PASSWORD_REQUEST = {
  api: {
    requestPassword: '/api/auth/passwordResetRequest'
  },
  component: PasswordRequestContainer,
  camelCaseKey: 'passwordRequest',
  navMenu: 'never',
  path: '/password-request',
  type: 'password-request'
};

export const WELCOME = {
  component: WelcomeContainer,
  camelCaseKey: 'welcome',
  navMenu: 'user',
  path: '/welcome',
  type: 'welcome'
};
