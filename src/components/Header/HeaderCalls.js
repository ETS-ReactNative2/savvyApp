import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconFeather from 'react-native-vector-icons/Feather'
import { theme } from '../../styles/ThemeColor'
import { Text } from '../../styles/Typography'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'

export class HeaderContacts extends Component {
  render() {
    return (
      <ContainerColor>
        <Row align="center" justify="space-between">
          <IconFeather name="bell" size={24} />
          <Text bold size="18px">
            Calls
          </Text>
          <Row align="center">
            <IconFeather name="video" size={24} />
            <IconFeather style={styles.icon} name="search" size={24} />
          </Row>
        </Row>
      </ContainerColor>
    )
  }
}

const ContainerColor = styled.View`
  background-color: #fff;
  padding: 20px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 80,
    resizeMode: 'contain',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  icon: {
    marginLeft: 20,
  },
})

export default HeaderContacts
