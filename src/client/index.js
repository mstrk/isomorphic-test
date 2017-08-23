
import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

// Main Application Styles
import './scss/index.scss'

import configureStore from './store'
import Html from './components/Html'
import routes from './routes'

const store = configureStore(window.__INITIAL_STATE__)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
