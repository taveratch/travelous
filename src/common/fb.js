import Api from 'common/api'
import stores from 'stores'

const accessToken = 'EAAKdkVKATwQBAMZB5xPxClMy2nZCHzhKCX4aLRAP9FCZBU5uaBx0b3KS2UeIq9aDjW3O9RIwNXMShyUdjwCZCI41Fa1PiVeZBaodqvCyVNk3niJzWOpLH6kvGGQd6pqAD2YxFQBdasY1cmtYEK0xzcI1XtUWgzVIICwaEDULWf5rZAY5QQqQqjzB0BE6URVOCt7JrCamztZAbUZBnWcmvS0ZC'

class Facebook {

  fetchFeed() {
    let token = stores.account.token
    const fields = ['name','full_picture','caption','comments','description','link','message','attachments']
    return Api.fetchFacebookFeed(token, fields)
  }

  fetchAccountInfo() {
    let token = stores.account.token
    const fields = ['picture','name']
    return Api.fetchFBAccountInfo(token, fields)
  }

  
}

export default Facebook