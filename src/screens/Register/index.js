import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'

export class Register extends Component {
  gotoCreatePassword() {
    this.props.navigation.navigate('create-password')
  }
  gotoEnterEmail() {
    this.props.navigation.navigate('enter-email')
  }
  goBack() {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Text bold size="24px">
          Create account
        </Text>
        <FormInput
          placeholder="Phone number"
          mt="10px"
          mb="15px"
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={() => this.gotoEnterEmail()}>
          <Text primary>Use your email instead</Text>
        </TouchableOpacity>
        <Row justify="flex-end" mt="40px">
          <Button
            title="Back"
            variant="secondary"
            onPress={() => this.goBack()}
          />
          <Button
            title="Next"
            textColor="white"
            ml="5px"
            onPress={() => this.gotoCreatePassword()}
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

export default Register
