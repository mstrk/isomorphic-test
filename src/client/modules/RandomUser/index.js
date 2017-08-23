import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { fetchUsers, initLoadDone } from './reducer'
import { getRandomUserSaga } from './sagas'

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

class RandomUser extends Component {
  static preloaders = [[getRandomUserSaga]]

  componentDidMount () {
    const { users, fetchUsers, initLoadDone, match } = this.props
    if (!users.error && (!users.data.length || !users.initialLoad)) {
      fetchUsers(match.params.gender)
    } else {
      initLoadDone()
    }
  }

  render () {
    const { users } = this.props
    const user = users.data.length ? users.data[0] : false
    const name = user ? `${capitalize(user.name.first)} ${capitalize(user.name.last)}` : ''
    return (
      <div style={styles.container}>
        <Helmet title={`Random User | ${name}`} />
        {users.loading ?
        <div>Loading...</div> : users.error ?
        <div>{users.error}</div> : user ?
        <div>
          <div className='avatar small' style={{ margin: '0 auto' }}>
            <img src={user.picture.large} alt='pic' />
          </div>
          <br />
          <div>Gender: {user.gender}</div>
          <div>Name: {name}</div>
          <div>Email: {user.email}</div>
        </div> : null}
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

const mapStateToProps = ({ users }) => ({ users })
const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (gender) => dispatch(fetchUsers(gender)),
  initLoadDone: () => dispatch(initLoadDone())
})


export default connect(mapStateToProps, mapDispatchToProps)(RandomUser)
