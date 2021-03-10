import styled from 'styled-components'
import { theme } from './ThemeColor'

export const Text = styled.Text`
  font-size: ${(props) => props.size || '14px'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-right: ${(props) => props.mr || '0'};
  margin-left: ${(props) => props.ml || '0'};
  ${({ light, semibold, bold }) => {
    switch (true) {
      case bold:
        return 'font-weight: 700'
      case semibold:
        return 'font-weight: 600'
      default:
        return 'font-weight: 400'
    }
  }}
  ${({ primary, white, body }) => {
    switch (true) {
      case primary:
        return `color: ${theme.primary}`
      case body:
        return `color: ${theme.body}`
      case white:
        return 'color: white'
      default:
        return `color: black`
    }
  }}
`
