import { Label } from 'common/components/Label'
import { PlainButton } from 'common/components/Button'
import React from 'react'
import history from 'common/history'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: url('/assets/ocean.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  min-height: 100%;
`

const BlackBG = styled.div`
  background: rgba(0,0,0,0.3);
  color: white;
  label {
    color: white;
  }
`

class Summary extends React.Component {

  onClick = () => {
    history.push('/feed')
  }
  
  render() {
    let count = this.props.location.search.split('=')[1]
    return (
      <Wrapper className="d-flex">
        <BlackBG className="col-11 col-md-7 p-4 m-auto text-center">
          <Label>{'You have imported'}</Label>
          <h3 className="mt-3 mb-3 ">{count}</h3>
          <Label>{'Reviews'}</Label>
          <div className="mt-3">
            <PlainButton className="btn m-auto" color="white" onClick={() => this.onClick()}>Import More</PlainButton>
          </div>
        </BlackBG>
      </Wrapper>
    )
  }
}


export default Summary