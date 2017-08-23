/*
 *
 * Main Application Routes
 *
 */

import chalk from 'chalk'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

import configureStore from '../client/store'
import waitAll from '../client/store/waitAll'
import Html from '../client/components/Html'
import routes from '../client/routes'

const store = configureStore()
const doctype = '<!DOCTYPE html>'

export default (app) => {
  app.get('*', (req, res) => {
    if (__DEV__) {
      webpackIsomorphicTools.refresh()
    }

    const branch = matchRoutes(routes, req.url)

    // Preloaders are defined in the components constructor
    // @example: `static preloader = [[someSagaToBeRun, params], [someSagaToBeRun]]`
    const preloaders = branch.reduce((acc, { route, match }) => {
      const preloaders = route.component.preloaders

      // only exact routes preloaders will be run
      // remove `match.isExact` to run all routes preloaders
      // preloaders must be an array of arrays
      if (match.isExact && Array.isArray(preloaders)) {
        return [...acc, ...preloaders.map(preloader => {
          const saga = preloader[0]
          // if no params are passed on `Component.preloder`
          // it falls back to `match.params`
          // params must be an object as it will be passed to the saga
          // as the first argument normally called `action`
          const params = preloader.length === 2 &&
          !Array.isArray(preloader[1]) && typeof preloader[1] === 'object'
          ? preloader[1] : {...match.params}
          return [saga, params]
        })]
      }

      return acc
    }, [])

    const runTasks = store.runSaga(waitAll(preloaders))

    // run the sagas and serve the html result
    runTasks.done.then(() => {
      let context = {}
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      )

      const helmet = Helmet.rewind()
      const content = ReactDOMServer.renderToStaticMarkup(
        <Html markup={markup} helmet={helmet} state={store.getState()} assets={webpackIsomorphicTools.assets()} />
      )
      const html = doctype + content

      if (context.status === 404) {
        res.status(404)
      }

      res.send(html)
    })
    .catch(err => {
      console.log(err.stack)
    })

    // kill the running sagas
    store.close()
  })
}
