import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'
import { theme } from '../../styles/ThemeColor'

export const HeaderWrapper = (props) => {
  return (
    <Layout>
      <Container>
        <Row align="center" justify="space-between">
          {props.children}
        </Row>
      </Container>
    </Layout>
  )
}

const Layout = styled.View`
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`
const Container = styled.View`
  margin: 10px;
  height: 50px;
  justify-content: center;
`
