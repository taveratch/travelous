import { Route, Router, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Firebase from 'common/firebase'
// import NavigationBar from 'common/components/NavigationBar'
import React from 'react'
import history from 'common/history'
import routes from 'routes/routes-config'

@inject('stores')
@observer
class Routes extends React.Component {

  accountStore = this.props.stores.account

  constructor(props) {
    super(props)
    Firebase.init()
    this.accountStore.checkLogin()
  }

  render() {
    if(this.accountStore.isLoading) return <div></div>
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              {
                routes.map((item, i) => <Route key={i} path={item.path} component={item.component} />)
              }
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default Routes