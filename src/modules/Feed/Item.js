import CheckBox from 'common/components/CheckBox'
import { Label } from 'common/components/Label'
import React from 'react'
import styled from 'styled-components'

const ListItem = styled.div`
  background: rgba(0,0,0,0.3);
  white-space: pre-line;
  ${'' /* max-height: 300px; */}
  overflow: hidden;
  position: relative;
`

const SeeMore = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: white;
`

const CheckBoxWrapper = styled.div`
  float: right;
`

class Item extends React.Component {

  withoutNewLine(text) {
    return text
    return text.replace('\n', ' ')
  }

  render() {
    return (
      (<ListItem className="p-4">
        <CheckBoxWrapper>
          <CheckBox size={25} feed={this.props.feed} onCheck={this.props.onCheck} />
        </CheckBoxWrapper>
        <Label color="white" bold>{this.props.feed.name}</Label>
        <Label color="white">{this.withoutNewLine(this.props.feed.description)}</Label>
        {/* <SeeMore className="text-center d-flex">
          <Label className="m-auto">SeeMore</Label>
        </SeeMore> */}
      </ListItem>)
    )
  }
}


export default Item