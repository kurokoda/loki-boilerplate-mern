import AboutContainer from '../../../container/page/about';
import FeatureContainer from '../../../container/page/feature';
import FeaturesContainer from '../../../container/page/features';
import HomeContainer from '../../../container/page/home';
import PasswordResetContainer from '../../../container/page/passwordReset';
import PasswordRequestContainer from '../../../container/page/passwordRequest';
import WelcomeContainer from '../../../container/page/welcome';

import AboutComponent from '../../../component/page/about';
import FeatureComponent from '../../../component/page/feature';
import FeaturesComponent from '../../../component/page/features';
import HomeComponent from '../../../component/page/home';
import PasswordResetComponent from '../../../component/page/passwordReset';
import PasswordRequestComponent from '../../../component/page/passwordRequest';
import WelcomeComponent from '../../../component/page/welcome';

export const ABOUT = {
  api: {
    pageData: '/api/page/about'
  },
  getPageRoute: () => '/about',
  getDataRoute: () => '/api/page/about',
  container: AboutContainer,
  component: AboutComponent,
  camelCaseKey: 'about',
  navMenu: 'always',
  path: '/about',
  type: 'about'
};

export const FEATURE = {
  api: {
    pageData: '/api/page/feature'
  },
  getPageRoute: () => '/feature',
  getDataRoute: () => '/api/page/feature',
  container: FeatureContainer,
  component: FeatureComponent,
  camelCaseKey: 'feature',
  navMenu: 'never',
  path: '/feature',
  type: 'feature'
};

export const FEATURES = {
  api: {
    pageData: '/api/page/features'
  },
  getPageRoute: () => '/features',
  getDataRoute: () => '/api/page/features',
  container: FeaturesContainer,
  component: FeaturesComponent,
  camelCaseKey: 'features',
  navMenu: 'always',
  path: '/features',
  type: 'features'
};

export const HOME = {
  api: {
    pageData: '/api/page/home'
  },
  getPageRoute: () => '/',
  getDataRoute: () => '/api/page/home',
  container: HomeContainer,
  component: HomeComponent,
  exact: true,
  camelCaseKey: 'home',
  navMenu: 'never',
  path: '/',
  type: 'home'
};

export const PASSWORD_RESET = {
  getPageRoute: () => '/password-reset',
  container: PasswordResetContainer,
  component: PasswordResetComponent,
  camelCaseKey: 'passwordReset',
  navMenu: 'never',
  path: '/password-reset',
  type: 'password-reset'
};

export const PASSWORD_REQUEST = {
  api: {
    requestPassword: '/api/auth/passwordResetRequest'
  },
  getPageRoute: params => '/password-request',
  container: PasswordRequestContainer,
  component: PasswordRequestComponent,
  camelCaseKey: 'passwordRequest',
  navMenu: 'never',
  path: '/password-request',
  type: 'password-request'
};

export const WELCOME = {
  getPageRoute: () => '/welcome',
  container: WelcomeContainer,
  component: WelcomeComponent,
  camelCaseKey: 'welcome',
  navMenu: 'user',
  path: '/welcome',
  type: 'welcome'
};
