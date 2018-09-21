import { inject, observer } from 'mobx-react'

import { ClipLoader } from 'react-spinners'
import Item  from 'modules/Feed/Item'
import { Label } from 'common/components/Label'
import { PlainButton } from 'common/components/Button'
import React from 'react'
import _ from 'lodash'
import { css } from 'react-emotion'
import history from 'common/history'
import styled from 'styled-components'
import { toJS } from 'mobx'

const Wrapper = styled.div`
  background: url('/assets/ocean.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  min-height: 100%;
`

const SubWrapper = styled.div`
  min-height: 100%;
`

const override = css`
    display: block !important;
    margin: 0 auto;
    border-color: red;
`

const SaveButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0,0,0,0.7);
`

const BlackBG = styled.div`
  background: rgba(0,0,0,0.3);
  color: white;
  label {
    color: white;
  }
`



@inject('stores')
@observer
class Feed extends React.Component {
  feedStore = this.props.stores.feed
  accountStore = this.props.stores.account
  
  constructor(props) {
    super(props)
    this.feedStore.fetchFeed()
    this.feedStore.clear()
  }

  onCheck = (id, isChecked) => {
    if(isChecked) {
      this.feedStore.selectFeed(id)
    }else {
      this.feedStore.unselectFeed(id)
    }
  }

  isLoading = () => {
    return _.indexOf([this.feedStore.isLoading, this.accountStore.isLoading], true) >= 0
  }

  onSaveButtonClick = () => {
    this.feedStore.saveSelectedFeed()
    let count = this.feedStore.selectedFeed.length
    history.push(`/summary?count=${count}`)
  }

  saveButton = () => {
    if(this.feedStore.selectedFeed.length > 0) {
      return (<SaveButtonWrapper className="text-center d-flex">
        <PlainButton className="btn m-auto" color="white" onClick={() => this.onSaveButtonClick()}>Save</PlainButton>
      </SaveButtonWrapper>)
    }
  }

  showFeedIfLoaded = () => {
    if(this.isLoading()) {
      return <div className="pt-3">
        <ClipLoader
          className={override}
          sizeUnit={'px'}
          size={40}
          color={'#ffffff'}
          loading
        />
      </div>
    }else if(this.feedStore.feed.length == 0){
      return <div className="p-4">
        <BlackBG className="p-4">
          <Label>Sorry, you have no content to import.</Label>
        </BlackBG>
      </div>
    }else {
      return <SubWrapper>
        {
          this.feedStore.feed.map((feed, key) => {
            return (
              <div key={key} className="p-3">
                <Item feed={feed} onCheck={this.onCheck} />
              </div>
            )
          })
        }
        {
          this.saveButton()
        }
      </SubWrapper>
    }
  }

  render() {
    return (
      <Wrapper>
        {
          this.showFeedIfLoaded()
        }
      </Wrapper>
    )
  }
}


export default Feed