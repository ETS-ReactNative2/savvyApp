import React, { Component } from 'react'
import { Image, StyleSheet, Switch, View } from 'react-native'
import { Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import Icon from 'react-native-vector-icons/Feather'
import CheckBox from 'react-native-check-box'
import { theme } from '../../styles/ThemeColor'

export class EnterPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: true,
      isChecked: false,
    }
  }
  toggleCheckBox() {
    this.setState({
      isChecked: !this.state.isChecked,
      showPassword: !this.state.showPassword,
    })
  }
  goBack() {
    this.props.navigation.goBack()
  }
  gotoHome() {
    this.props.navigation.navigate('tab-navigator')
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Row mt="10px" mb="10px" align="center">
          <TouchableOpacity onPress={() => this.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text ml="10px">shafanaura48@gmail.com</Text>
        </Row>
        <Text bold size="24px">
          Enter Password
        </Text>
        <FormInput
          placeholder="Password"
          mt="10px"
          mb="15px"
          secureTextEntry={this.state.showPassword}
          onChangeText={(password) => this.setState({ password })}
        />
        <CheckBox
          checkedCheckBoxColor={`${theme.primary}`}
          uncheckedCheckBoxColor="black"
          onClick={() => this.toggleCheckBox()}
          isChecked={this.state.isChecked}
          rightText={'Show Password'}
        />
        <TouchableOpacity>
          <Text primary mt="10px">
            Forgot password?
          </Text>
        </TouchableOpacity>
        <Row justify="flex-end" mt="40px">
          <Button
            title="Sign in"
            textColor="white"
            ml="5px"
            onPress={() => this.gotoHome()}
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

export default EnterPassword
