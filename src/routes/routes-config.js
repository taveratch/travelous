import FeedPage from 'modules/Feed'
import SignInPage from 'modules/authen/Signin'
import SummaryPage from 'modules/Summary'

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
  },
  {
    path: '/summary',
    label: 'Summary',
    component: SummaryPage
  }
]