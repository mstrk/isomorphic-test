
import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <header className='AppBar'>
    <div className='container'>
      <div className='left-content'>
        <Link className='space-me' to="/">Home</Link>
        <Link className='space-me' to="/about">About</Link>
        <Link className='space-me' to="/music">Music</Link>
        <Link className='space-me' to="/randomuser">Random User</Link>
      </div>
    </div>
  </header>
)
