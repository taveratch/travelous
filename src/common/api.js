import ApiManager from 'common/api-manager'
import _ from 'lodash'

const API_ENDPOINT = 'http://localhost:8080'

const GET = (path) => ApiManager.fetch({
  url: `${API_ENDPOINT}${path}.json`
})

const FACEBOOK_API = 'https://graph.facebook.com/v3.1'

export default {
  fetchFacebookFeed: (accessToken, fields) => {
    return ApiManager.fetch({
      url: `${FACEBOOK_API}/me/feed?fields=${_.join(fields, ',')}&access_token=${accessToken}`
    })
  },
  fetchFBAccountInfo: (accessToken, fields) => {
    return ApiManager.fetch({
      url: `${FACEBOOK_API}/me?fields=${_.join(fields, ',')}&access_token=${accessToken}`
    })
  }
}