/* eslint-disable no-underscore-dangle */

import GoogleAnalytics from "@redux-beacon/google-analytics";
import GoogleTagManager from "@redux-beacon/google-tag-manager";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, createMemoryHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createMiddleware } from "redux-beacon";
import { persistCombineReducers, persistStore } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import thunk from "redux-thunk";
import {
  googleAnalyticsEventsMap,
  googleTagManagerEventsMap
} from "../actions/analytics";
import reducers from "../reducers/index";
import { isBrowserEnvironment } from "../utils/isomorphic";

const googleAnalyticsMiddleWare = createMiddleware(
  googleAnalyticsEventsMap,
  GoogleAnalytics()
);

const googleTagManagerMiddleWare = createMiddleware(
  googleTagManagerEventsMap,
  GoogleTagManager()
);

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const configureStore = (url = "/") => {
  let history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const enhancers = [];
  let initialState = {};
  let persistor;
  let rootReducer;
  let devToolsExtension;

  if (isBrowserEnvironment) {
    /*
     * This require() call is necessary due to dependencies within
     * the package that break server-side rendering.
     */
    const storage = require("redux-persist/es/storage").default; // eslint-disable-line global-require

    const persistConfig = {
      blacklist: [],
      key: "tylt-web-votes",
      storage, // LocalStorage if web, AsyncStorage if react-native
      transforms: [immutableTransform()],
      whitelist: ["votes"]
    };

    rootReducer = persistCombineReducers(persistConfig, reducers);

    if (process.env.NODE_ENV !== "production") {
      devToolsExtension = window.devToolsExtension;
      if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
      }
    }

    history = createBrowserHistory();
    initialState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
  } else {
    history = createMemoryHistory({ initialEntries: [url] });
    rootReducer = combineReducers(reducers);
  }

  const middleware = [
    thunk,
    googleAnalyticsMiddleWare,
    googleTagManagerMiddleWare,
    routerMiddleware(history)
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  const getState = () => {
    store.getState();
  };

  if (isBrowserEnvironment) {
    persistor = persistStore(store, null, getState);
    // To disable persistent data, just uncomment the following line of code.
    // persistor.purge();
  }

  return {
    store,
    history,
    persistor
  };
};

export default configureStore;
