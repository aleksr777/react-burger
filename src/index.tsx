import './index.css'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/app/app'

const root = ReactDOM.createRoot( document.getElementById( "root" ) as HTMLElement )

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

