/*
 *
 * Application Configuration
 *
 */

import path from 'path'
import fs from 'fs'

// All configurations will extend these options
export default {
  port: process.env.PORT || 8443,

  ip: process.env.IP || '0.0.0.0',

  certificate: {
    key: fs.readFileSync(path.resolve(process.cwd(), 'src', 'certificate', 'server.key')),
    cert: fs.readFileSync(path.resolve(process.cwd(), 'src', 'certificate', 'server.crt'))
  }
}
