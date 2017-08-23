/*
 *
 * Request
 * fetch wrapper
 *
 */

import fetch from 'isomorphic-fetch'

function checkStatus (response) {
  if (response.ok) {
    return Promise.resolve(response.json())
  }

  const reason = {
    status: response.status,
    statusText: response.statusText,
    message: response.statusText || response.status
  }

  return response.json().then(json => {
    if (json.message) {
      reason.message = json.message
    }

    return Promise.reject(reason)
  })
  .catch(e => Promise.reject(reason))
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
