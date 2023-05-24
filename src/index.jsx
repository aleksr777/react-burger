import './index.css';
import React from 'react';
import { Provider } from 'react-redux';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './services/root-reducer';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import { socketMiddleware } from './services/socketMiddleware/socketMiddleware';
import { urlFeedOrders, urlProfileOrders } from './utils/api';
import { feedOrdersActions } from './services/feed-all-orders/feed-all-orders-actions';
import { profileOrdersActions } from './services/profile-orders/profile-orders-actions';

const socketMiddlewareFeedOrders = socketMiddleware(urlFeedOrders, feedOrdersActions);
const socketMiddlewareProfileOrders = socketMiddleware(urlProfileOrders, profileOrdersActions);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(socketMiddlewareFeedOrders, socketMiddlewareProfileOrders)
});

const persistor = persistStore(store);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

export { store };
