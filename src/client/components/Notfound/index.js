
import React from 'react'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

const NotFound = () => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = 404;
    }

    return (
      <div>
        <Helmet title='Not Found' />
        <h1>404 : Not Found</h1>
      </div>
    )
  }}/>
)

export default NotFound
