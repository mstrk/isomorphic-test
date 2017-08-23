/*
 *
 * Express Configuration
 *
 */

import path from 'path'
import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'

import productionLog from '../../util/productionLog'
import errorHandler from '../../util/errorHandler'

export default (app) => {
  app.use(compression())
  app.use(cookieParser())
  app.use(favicon(path.resolve(process.cwd(), 'src', 'public', 'favicon.ico')))
  app.use(express.static(path.resolve(process.cwd(), __DEV__ ? 'src' : 'dist', 'public')))
  app.use(morgan(__DEV__ ? 'dev' : productionLog))
  app.use(__DEV__ ? errorHandler.dev : errorHandler.prod)
}
