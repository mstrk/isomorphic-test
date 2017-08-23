/**
 *
 * Server main file
 *
 */

import spdy from 'spdy'
import config from './config/environment'
const ip = require('ip')

// Setup server
const app = require('express')();
const server = spdy.createServer(config.certificate, app)
require('./config/express').default(app)
require('./routes').default(app)

// Start server
server.listen(config.port, config.ip, () => {
  require('../util/initialLog').default(app.get('env'), config.port)
})
