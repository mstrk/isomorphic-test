
import React, { Component } from 'react'
import Helmet from 'react-helmet'

import imgSrc from '../../../public/images/profile.jpg'

class Home extends Component {
  alert = () => {
    alert('some msg!!')
  }
  render () {
    return (
      <div style={styles.container}>
        <Helmet title='Universal React' />
        <h1>Home Page</h1>
        <div className='avatar'>
          <img src={imgSrc} />
        </div>
        <br />
        <button onClick={this.alert}>click me</button>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default Home
