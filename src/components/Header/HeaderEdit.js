import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../../styles/ThemeColor'
import { Text } from '../../styles/Typography'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'

class HeaderEdit extends Component {
  goBack = () => {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <ContainerColor>
        <Row align="center">
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="west" size={30} />
          </TouchableOpacity>
          <Text bold size="18px" ml="20px">
            Profile
          </Text>
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

export default HeaderEdit
