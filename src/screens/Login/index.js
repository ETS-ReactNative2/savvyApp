import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'

export class Login extends Component {
  gotoEnterPassword() {
    this.props.navigation.navigate('enter-password')
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Text bold size="24px">
          Sign in
        </Text>
        <Text body>to continue to Skype</Text>
        <FormInput placeholder="Skype, phone, or email" mt="10px" mb="15px" />
        <RowDesc>
          <Text>No Account?</Text>
          <TouchableOpacity>
            <Text primary> Create one!</Text>
          </TouchableOpacity>
        </RowDesc>
        <Row>
          <Button
            title="Next"
            textColor="white"
            ml="5px"
            onPress={() => this.gotoEnterPassword()}
          />
        </Row>
      </Container>
    )
  }
}

const RowDesc = styled.View`
  flex-direction: row;
`
const Row = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 40px;
`

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 120,
    resizeMode: 'contain',
  },
})

export default Login
