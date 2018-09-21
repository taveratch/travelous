import { action, computed, observable, toJS } from 'mobx'

import Facebook from 'common/fb'
import Firebase from 'common/firebase'
import _ from 'lodash'
import stores from 'stores'

class Feed {
    facebook = new Facebook()
    @observable feed = []
    @observable isLoading = false
    @observable selectedFeed = []

    fetchFeed() {
      this.isLoading = true
      this.facebook.fetchFeed()
        .then(res => {
          this.feed = res.data
          console.log(res.data)
        })
        .finally(() => {
          this.isLoading = false
        })
    }

    @action
    selectFeed(feedId) {
      let feed = _.find(this.feed, { id: feedId })
      this.selectedFeed.push(feed)
    }

    @action
    unselectFeed(feedId) {
      _.remove(this.selectedFeed, n => n.id == feedId)
    }

    createBody(description = '') {
      return _.filter(_.map(description.split('\n'), line => ({ type: 'text', 'value': line})), line => line.value.trim() != '')
    }

    createGallery(attachments = { data: [] }) {
      if(attachments.data.length == 0) return []
      if(attachments.data[0].subattachments == undefined) return []
      return _.filter(_.map(attachments.data[0].subattachments.data, data => ({
        image_url: _.get(data, 'media.image.src') || null,
        width: _.get(data, 'media.image.width'),
        height: _.get(data, 'media.image.height'),
        title: _.get(data, 'title') || null,
        type: _.get(data, 'type') || null,
      })), item => item.type == 'photo')
    } 

    mapToFirebaseStructure() {
      return _.map(this.selectedFeed, feed => ({
        body: this.createBody(feed.description),
        gallery: this.createGallery(feed.attachments),
        cover_image_url: feed.full_picture || null,
        title: feed.name || null,
        author: toJS(stores.account.account)
      }))
    }

    saveSelectedFeed() {
      let articles = this.mapToFirebaseStructure()
      articles.map(async article => {
        let db = Firebase.getDB()
        let feedRef = db.collection('Feed').doc()
        await feedRef.set(article)
      })
    }
}

export default Feed