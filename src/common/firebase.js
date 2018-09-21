import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCixVSfRKQO7snGXaCrq0Le_xWjM8LKL_4',
  authDomain: 'travelous-8492b.firebaseapp.com',
  databaseURL: 'https://travelous-8492b.firebaseio.com',
  projectId: 'travelous-8492b',
  storageBucket: 'travelous-8492b.appspot.com',
  messagingSenderId: '436117150710'
}

class Firebase {
  init() {
    firebase.initializeApp(config)
  }  

  getDB() {
    const firestore = firebase.firestore()
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings)
    return firestore
  }
}

const f = new Firebase()
export default f