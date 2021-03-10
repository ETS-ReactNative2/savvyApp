import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'

export class EnterEmail extends Component {
  goBack() {
    this.props.navigation.goBack()
  }
  gotoLogin() {
    this.props.navigation.navigate('login')
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Text bold size="24px">
          Create account
        </Text>
        <FormInput
          placeholder="someone@example.com"
          mt="10px"
          mb="15px"
          keyboardType="email-address"
        />
        <TouchableOpacity onPress={() => this.goBack()}>
          <Text primary>Use a phone number instead</Text>
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

export default EnterEmail
