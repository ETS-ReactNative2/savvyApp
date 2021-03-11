import React, { Component } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { Row } from '../styles/ComponentStyle'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import avatar from '../assets/images/avatar2.jpg'
import { theme } from '../styles/ThemeColor'

export class HeaderHome extends Component {
  render() {
    return (
      <Container>
        <Row align="center" justify="space-between">
          <Icon name="bell" size={24} />
          <Row align="center">
            <Image source={avatar} style={styles.img} />
            <Icon style={styles.icon} name="video" size={24} />
            <Icon style={styles.icon} name="search" size={24} />
            <Icon style={styles.icon} name="more-vertical" size={24} />
          </Row>
        </Row>
      </Container>
    )
  }
}

const Container = styled.View`
  background-color: #fff;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`
const styles = StyleSheet.create({
  img: {
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  icon: {
    paddingLeft: 25,
  },
})

export default HeaderHome
