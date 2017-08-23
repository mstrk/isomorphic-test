
import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Music from './components/Music'
import RandomUser from './modules/RandomUser'
import NotFound from './components/Notfound'

const routes = [
  { component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/music',
        component: Music
      },
      {
        path: '/randomuser',
        component: RandomUser,
        exact: true
      },
      {
        path: '/randomuser/:gender',
        component: RandomUser,
        exact: true
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
