import { StyleSheet } from 'aphrodite';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { hydrateLocalizationData } from './actions/localization';
import { hydrateThemeData } from './actions/theme';
import Loading from './component/loading';
import App from './container/app';
import './index.css';
import localizationData from './localization/en-us.json';
import createStore from './store';
import { ApplicationProvider } from './context/application';

const { store, history, persistor } = createStore();
const root = document.querySelector('#root');

if (!store.getState().localization) {
  const stringifiedLocalizationData = JSON.stringify(localizationData);
  store.dispatch(hydrateLocalizationData(stringifiedLocalizationData));
}

if (!store.getState().theme) {
  const theme = require('./theme/light').default;
  store.dispatch(hydrateThemeData(theme));
  console.log('Force hydrating theme data', theme);
}

const applicationContext = {
  strings: store.getState().localization,
  theme: store.getState().theme
};

console.log('theme', store.getState().theme);

const Application = (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Frontload noServerRender>
          <ApplicationProvider value={applicationContext}>
            <App />
          </ApplicationProvider>
        </Frontload>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

StyleSheet.rehydrate(window.renderedClassNames);

render(Application, root);
