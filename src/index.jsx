import './index.css';
import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root-reducer';

// Усилитель
const actionLogger = store => next => action => {
  // Выводим в консоль время события и его содержание
  console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}`);
  // Передаём событие «по конвейеру» дальше
  return next(action);
};

// Усилитель
const errorLogger = store => next => action => {
  if (action.type === 'SOMETHING_FAILED') {
    console.error(`Произошла ошибка: ${JSON.stringify(action)}`)
  }
  return next(action);
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, actionLogger, errorLogger));

const store = createStore(rootReducer, enhancer);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
