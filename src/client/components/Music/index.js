
import React from 'react'
import Helmet from 'react-helmet'

const Music = () => (
  <div>
    <Helmet title='Music | Postmodern Jukebox' />
    <h1>Music</h1>
    <iframe
      width='560'
      height='315'
      src='https://www.youtube-nocookie.com/embed/9T0BQEnlxCc?&autoplay=1'
      frameBorder='0'
      allowFullScreen
    />
  </div>
)

export default Music
