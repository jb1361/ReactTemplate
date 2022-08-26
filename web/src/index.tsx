import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// tslint:disable-next-line:no-import-side-effect
import './common/util/array';
import React from 'react';
// tslint:disable-next-line:no-import-side-effect
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {configureFontAwesome} from './font-awesome-config';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import {validateEnvironment} from './env';
// tslint:disable-next-line:no-import-side-effect
import './dark-mode.scss';
import {configureTheme} from './appTheme';
import { createRoot } from 'react-dom/client';
import History from './router/history';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {RoutePaths} from './router/RoutePaths';
validateEnvironment();
configureTheme();
configureFontAwesome();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HistoryRouter history={History}>
        <App />
      </HistoryRouter>
    </PersistGate>
  </Provider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
