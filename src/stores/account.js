import { action, computed, observable } from 'mobx'

import Facebook from 'common/fb'
import Firebase from 'common/firebase'
import _ from 'lodash'

class Account {
    facebook = new Facebook()
    @observable account = {}
    @observable token = ''
    @observable isLoading = false
    @observable isRegistered = false

    @action
    fetchFBAccount() {
      this.isLoading = true
      return this.facebook.fetchAccountInfo()
        .then(async res => {
          this.account = {
            id: res.id,
            name: res.name,
            picture_url: _.get(res, 'picture.data.url')
          }
          this.isRegistered = (await this.isAccountExisting())
        })
        .finally(() => {
          this.isLoading = false
        })
    }

    checkLogin() {
      this.isLoading = true
      let self = this
      setTimeout(() => {
        window.FB.getLoginStatus(res => {
          console.log(res)
          if(res.status == 'connected') {
            localStorage.setItem('token', res.authResponse.accessToken)
            self.token = res.authResponse.accessToken
            self.fetchFBAccount().finally(() => {
              self.isLoading = false
            })
          }
        })
        this.isLoading = false
      }, 200)
    }

    logout() {
      window.FB.logout()
    }

    saveAccount(email) {
      let db = Firebase.getDB()
      let accountRef = db.collection('Accounts')
      accountRef.where('id', '==', this.account.id).get()
        .then(snapshot => {
          if(snapshot.empty) {
            accountRef.doc().set({...this.account, ...{email: email}})
            this.isRegistered = true
          }
        })
    }

    isAccountExisting() {
      let db = Firebase.getDB()
      let accountRef = db.collection('Accounts')
      return new Promise((resolve) => {
        accountRef.where('id', '==', this.account.id).get()
          .then(snapshot => {
            resolve(!snapshot.empty)
          })
      })
    }
}

export default Account