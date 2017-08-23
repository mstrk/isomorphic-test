/**
 *
 * morgan middleware log function
 *
 */

import { blue, magenta, green, red, yellow, cyan } from 'chalk'

const colorStatus = (str, res) => {
  const status = res._header
    ? res.statusCode
    : undefined

  // get status color
  var colorStatus = status >= 500 ? red(str)
    : status >= 400 ? yellow(str)
    : status >= 300 ? cyan(str)
    : status >= 200 ? green(str)
    : str

  return colorStatus
}

export default (tokens, req, res) => [
  blue(tokens.method(req, res)),
  magenta(tokens.url(req, res)),
  colorStatus(tokens.status(req, res), res),
  '-',
  green(`${tokens['response-time'](req, res)} ms`),
  '-',
  blue(tokens['remote-addr'](req, res)),
  magenta(`[${tokens.date(req, res, 'clf')}]`),
  '-',
  `"${tokens['user-agent'](req, res)}"`
].join(' ')
