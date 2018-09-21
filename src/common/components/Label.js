import Colors from 'common/components/Colors'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

export const Label = styled.label`
    color: ${props => Colors.get(props.color || 'black')};
    font-size: 1em;
    margin: 0px;
    padding: 0px;
    line-height: 1.5em;
    font-weight: ${props => props.thin ? 300 : props.bold ? 600 : 400}
`

export const ThinLabel = styled(Label)`
  font-weight: 200
`

export const SubLabel = styled(Label)`
  font-size: 0.9em;
`

export const Remark = styled(Label)`
  font-size: 0.7em;
`

export const Link = styled(RouterLink)`
  color: black;
  label {
    &:hover {
      color: black;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`