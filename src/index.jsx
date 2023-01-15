import React from 'react'; 
import { compose, createStore, applyMiddleware } from 'redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root-reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const store = createStore(rootReducer, enhancer); 

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <div id="react-modals"></div>
  </React.StrictMode>,
);
