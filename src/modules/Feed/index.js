import { inject, observer } from 'mobx-react'

import { ClipLoader } from 'react-spinners'
import Item  from 'modules/Feed/Item'
import React from 'react'
import _ from 'lodash'
import { css } from 'react-emotion'
import styled from 'styled-components'
import { toJS } from 'mobx'

const Wrapper = styled.div`
  background: url('/assets/ocean.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  min-height: 100%;
`

const override = css`
    display: block !important;
    margin: 0 auto;
    border-color: red;
`



@inject('stores')
@observer
class Feed extends React.Component {
  feedStore = this.props.stores.feed
  accountStore = this.props.stores.account
  
  constructor(props) {
    super(props)
    this.feedStore.fetchFeed()
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
    }else {
      return <div>
        <button onClick={() => this.onSaveButtonClick()}>Save</button>
        {
          this.feedStore.feed.map((feed, key) => {
            return (
              <div key={key} className="p-3">
                <Item feed={feed} onCheck={this.onCheck} />
              </div>
            )
          })
        }
      </div>
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