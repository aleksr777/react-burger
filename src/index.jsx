import './index.css';
import React from 'react';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import { rootReducer } from './services/root-reducer';

const blacklist = [
  'ingredientsData', 
  'selectedIngr',
  'orderId', 
  'ingredientDetails',
  'currentTab',
];

const persistConfig = {
  key: 'root',
  storage,
  blacklist,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});

const persistor = persistStore(store);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null}  persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter >
  </React.StrictMode>,
);
