import localization from './localization';
import logging from './logging';
import modal from './modal';
import pageData from './pageData';
import rehydrated from './rehydrated';
import theme from './theme';
import user from './user';
import { connectRouter } from 'connected-react-router';

export default history => {
  return {
    router: connectRouter(history),
    localization,
    logging,
    modal,
    pageData,
    rehydrated,
    theme,
    user
  };
};
