import Account from 'stores/account'
import Feed from 'stores/feed'

const stores = {}

stores.feed = new Feed()
stores.account = new Account()

export default stores