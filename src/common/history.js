import createHistory from 'history/createBrowserHistory'

const history = createHistory()

history.listen((location, action) => {
  if(action == 'PUSH') {
    window.scrollTo(0,0)
  }
})

export default history