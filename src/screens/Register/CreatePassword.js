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

export class CreatePassword extends Component {
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
  gotoEnterName() {
    this.props.navigation.navigate('enter-name')
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
        <Row justify="flex-end" mt="40px">
          <Button
            title="Next"
            textColor="white"
            ml="5px"
            onPress={() => this.gotoEnterName()}
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

export default CreatePassword
