import styled from 'styled-components'
import { theme } from './ThemeColor'

export const Text = styled.Text`
  font-size: ${(props) => props.size || '14px'};
  padding: ${(props) => props.p || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-right: ${(props) => props.mr || '0'};
  margin-left: ${(props) => props.ml || '0'};
  text-align: ${(props) => props.align || 'left'};
  font-family: 'OpenSans-Regular'
    ${({ light, semibold, bold }) => {
      switch (true) {
        case bold:
          return 'font-family: OpenSans-Bold'
        case semibold:
          return 'font-family: OpenSans-SemiBold'
        default:
          return 'font-family: OpenSans-Regular'
      }
    }}
    ${({ primary, white, body, label }) => {
      switch (true) {
        case primary:
          return `color: ${theme.primary}`
        case body:
          return `color: ${theme.body}`
        case label:
          return `color: ${theme.label}`
        case white:
          return 'color: white'
        default:
          return `color: black`
      }
    }};
`
export const ErrorText = styled.Text`
  color: ${theme.error};
  font-family: 'OpenSans-Regular';
  margin-top: ${(props) => props.mt || '0'};
`
