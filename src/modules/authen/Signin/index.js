import { inject, observer } from 'mobx-react'

import { ClipLoader } from 'react-spinners'
import FacebookLogin from 'react-facebook-login'
import { PlainButton } from 'common/components/Button'
import React from 'react'
import { css } from 'react-emotion'
import history from 'common/history'
import styled from 'styled-components'

const override = css`
    display: block !important;
    margin: 0 auto;
    border-color: red;
`

const Wrapper = styled.div`
  background: url('/assets/ocean.png');
  background-size: cover;
`

const Input = styled.input`
  background: transparent;
  border-color: white;
  color: white;

  &:focus {
    background: transparent;
    color: white;
    border-color: white;
  }
`

const WhiteLabel = styled.label`
  color: white;
`

@inject('stores')
@observer
class SignIn extends React.Component {

  accountStore = this.props.stores.account

  constructor(props) {
    super(props)
  }

  onLogin = () => {
    this.accountStore.checkLogin()
  }

  isLoading = () => {
    return this.accountStore.isLoading
  }

  register = () => {
    let email = document.getElementById('email-input').value
    console.log(email)
    this.accountStore.saveAccount(email)
  }

  signout = () => {
    this.accountStore.logout()
  }

  emailInput = () => {
    return (
      <div className="w-100">
        <WhiteLabel htmlFor="email-input">Email</WhiteLabel>
        <Input className="form-control" id="email-input" type="email" />
        <div className="mt-3 d-flex">
          <PlainButton className="btn m-auto" color="white" onClick={() => this.register()}>Sign in</PlainButton>
          <PlainButton className="btn m-auto" color="white" onClick={() => this.signout()}>Sign out</PlainButton>
        </div>
      </div>
    )
  }
  
  showButtonIfNeeded = () => {
    if(this.isLoading()) return <div className="pt-3">
      <ClipLoader
        className={override}
        sizeUnit={'px'}
        size={40}
        color={'#ffffff'}
        loading
      />
    </div>
    else if(this.accountStore.token != '') {
      return this.emailInput()
    }
    else {
      return <FacebookLogin
        appId="293149538175061"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.onLogin} />
    }
  }

  checkIsRegistered = (isRegistered) => {
    if(isRegistered) {
      history.push('/feed')
    }
  }

  render() {
    this.checkIsRegistered(this.accountStore.isRegistered)
    return (
      <Wrapper className="h-100 d-flex">
        <div className="m-4 w-100 d-flex">
          
          <div className="col-11 col-md-6 m-auto">
            <div className="text-center d-flex flex-column mb-4">
              <div className="mb-3">
                <img className="img-fluid" src="/assets/logo.png"/>
              </div>
              <WhiteLabel>Earn money from traveling</WhiteLabel>
            </div>
            <div className="d-flex justify-content-center">
              {this.showButtonIfNeeded()}
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}


export default SignIn