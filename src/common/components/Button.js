import Colors from 'common/components/Colors'
import styled from 'styled-components'

export const PrimaryButton = styled.button`
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 4px;
    background-color: #00616e;
    color: white;
    font-size: 0.8em;
`

export const WhiteButton = styled(PrimaryButton)`
    background-color: white;
    color: black;
`

export const FilledButton = styled(PrimaryButton)`
    background-color: ${props => Colors.get(props.color)};
    border-color: ${props => Colors.get(props.color)};
    color: ${Colors.get('white')};
    transition: 0.5s;
    &:hover {
        background-color: ${Colors.get('transparent')};
        color: ${props => Colors.get(props.color)};
    }
`

export const PlainButton = styled(PrimaryButton)`
    border-color: ${props => Colors.get(props.color)};
    background-color: ${Colors.get('transparent')};
    color: ${props => Colors.get(props.color)};
    transition: 0.5s;
    &:hover {
        background-color: ${props => Colors.get(props.color)};
        color: ${Colors.get('black')};
    }
`