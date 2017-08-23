
import React from 'react'

const getInitialState = state => {
  const json = JSON.stringify(state).replace('</', '<\\/')
  return `window.__INITIAL_STATE__=${ json }`
}

const Html = ({ markup, helmet, state, assets }) => {
  const styles = __DEV__ ? `/${assets.styles.main}` : assets.styles.main
  const js = __DEV__ ? `/${assets.javascript.main}` : assets.javascript.main
  return (
    <html>
      <head>
        <meta charSet='UTF-8' />
        { helmet && helmet.title.toComponent() }
        <meta name='viewport' content="width=device-width, initial-scale=1.0" />
        <link rel='stylesheet' type='text/css' href={styles} />
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: markup }} />
        <script dangerouslySetInnerHTML={{ __html: getInitialState(state) }} />
        <script src={js} />
      </body>
    </html>
  )
}

export default Html
