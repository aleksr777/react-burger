import rootReducer from '../services/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../services/socketMiddleware/socketMiddleware';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { urlFeedOrders, urlProfileOrders } from '../utils/api';
import { feedOrdersActions } from '../services/feed-all-orders/feed-all-orders-actions';
import { profileOrdersActions } from '../services/profile-orders/profile-orders-actions';

const socketMiddlewareFeedOrders = socketMiddleware(urlFeedOrders, feedOrdersActions);
const socketMiddlewareProfileOrders = socketMiddleware( urlProfileOrders, profileOrdersActions );


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socketMiddlewareFeedOrders, socketMiddlewareProfileOrders),
} );


export const persistor = persistStore(store);
