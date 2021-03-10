import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import Icon from 'react-native-vector-icons/Feather'

export class EnterName extends Component {
  gotoLogin() {
    this.props.navigation.navigate('login')
  }
  goBack() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Row mt="10px" mb="10px" align="center">
          <TouchableOpacity onPress={() => this.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text ml="10px">082254632185</Text>
        </Row>
        <Text bold size="24px">
          What's your name?
        </Text>
        <Text mt="10px" size="15px">
          We need a little more info before you can use this app
        </Text>
        <FormInput placeholder="First name" mt="10px" />
        <FormInput placeholder="Last name" mt="10px" />
        <Row justify="flex-end" mt="40px">
          <Button
            title="Next"
            textColor="white"
            ml="5px"
            onPress={() => this.gotoLogin()}
          />
        </Row>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 120,
    resizeMode: 'contain',
  },
})

export default EnterName
