import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'

const Button = (props) => {
  return (
    <ButtonCustom {...props}>
      <Text {...props}>{props.title}</Text>
    </ButtonCustom>
  )
}

const ButtonCustom = styled.TouchableOpacity`
  min-width: 110px;
  padding: ${({ size }) => handleSizeType(size)};
  align-items: center;
  background-color: ${({ variant }) => handleColorType(variant)};
  margin: ${(props) => props.m || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-right: ${(props) => props.mr || '0'};
  margin-left: ${(props) => props.ml || '0'};
`

const Text = styled.Text`
  color: ${(props) => props.textColor || 'black'};
`

const handleSizeType = (padding) => {
  switch (padding) {
    case 'lg':
      return '17px'
    case 'sm':
      return '6px'
    default:
      return '8px'
  }
}

const handleColorType = (color) => {
  switch (color) {
    case 'white':
      return `${theme.offwhite}`
    case 'secondary':
      return `${theme.secondary}`
    case 'danger':
      return `${theme.danger}`
    case 'success':
      return `${theme.success}`
    case 'transparent':
      return 'transparent'
    default:
      return `${theme.primary}`
  }
}

export default Button
