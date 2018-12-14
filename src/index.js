import { StyleSheet } from 'aphrodite';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { hydrateLocalizationData } from './actions/localization';
import Loading from './component/loading';
import App from './container/app';
import './index.css';
import localizationData from './localization/en-us.json';
import createStore from './store';

const { store, history, persistor } = createStore();
const root = document.querySelector('#root');

const Application = (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Frontload noServerRender>
          <App />
        </Frontload>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

if (!store.getState().localization) {
  const stringifiedLocalizationData = JSON.stringify(localizationData);
  store.dispatch(hydrateLocalizationData(stringifiedLocalizationData));
}

StyleSheet.rehydrate(window.renderedClassNames);

render(Application, root);
