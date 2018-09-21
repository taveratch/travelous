import Colors from 'common/components/Colors'
import React from 'react'
import styled from 'styled-components'

const Circle = styled.div`
  border-radius: 10000px;
  width: ${props => props.size || 20}px;
  height: ${props => props.size || 20}px;
  border: solid 1px white;
  cursor: pointer;
  display: flex;
  background-color: ${props => props.isChecked ? Colors.get('green') : Colors.get('transparent')};

  ${'' /* &:hover {
    background-color: ${props => props.isChecked ? Colors.get('green') : Colors.get('transparent')};
  } */}
`

class CheckBox extends React.Component {

  state = {
    isChecked: false
  }

  shouldShowChecked = () => {
    if(this.state.isChecked) {
      return <img className="m-auto" width={10} height={10} src="/assets/tick.svg" />
    }else {
      return 
    }
  }

  onClick = () => {
    this.setState({ isChecked: !this.state.isChecked }, () => {
      this.props.onCheck(this.props.feed.id, this.state.isChecked)
    })
  }

  render() {
    return (
      <Circle size={this.props.size} isChecked={this.state.isChecked} onClick={() => this.onClick()}>
        { this.shouldShowChecked() }
      </Circle>
    )
  }
}


export default CheckBox