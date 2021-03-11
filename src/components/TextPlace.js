import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import { Text } from '../styles/Typography'

const TextPlace = (props) => {
  return (
    <Container>
      <Row align="center" justify="space-between">
        <Icon name={props.icon} size={30} />
        {props.children}
      </Row>
    </Container>
  )
}

const Container = styled.View`
  background-color: #fff;
  padding: 10px;
  flex: 1;
  padding-bottom: 15px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
`
export default TextPlace
