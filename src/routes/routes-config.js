import FeedPage from 'modules/Feed'
import SignInPage from 'modules/authen/Signin'

export default [
  {
    path: '/signin',
    label: 'Signin',
    component: SignInPage
  },
  {
    path: '/feed',
    label: 'Feed',
    component: FeedPage
  }
]