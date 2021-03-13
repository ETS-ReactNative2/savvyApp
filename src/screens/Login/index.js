import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, ErrorText } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../styles/ThemeColor'
import axios from 'axios'

const Validation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
})

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedAs: '',
      isLoading: false,
      chatList: [],
    }
    this.login = this.login.bind(this)
    this.input = React.createRef()
  }
  login(values) {
    const { value: loggedAs } = values.email
    this.setState({ loggedAs })
    if (this.state.loggedAs !== '') {
      this.props.navigation.navigate('home-screen')
    }
  }
  gotoEnterPassword() {
    this.props.navigation.navigate('enter-password')
  }
  gotoRegister() {
    this.props.navigation.navigate('register')
  }
  render() {
    return (
      <Container>
        <Image source={Logo} style={styles.logo} />
        <Text bold size="24px">
          Sign in
        </Text>
        <Text body>to continue to Skype</Text>
        <Formik
          validateOnMount={true}
          validationSchema={Validation}
          initialValues={{ email: '' }}
          onSubmit={(values) => this.login(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            initialErrors,
            initialTouched,
            isValid,
            errors,
            touched,
          }) => (
            <>
              {errors.email && touched.email && (
                <ErrorText mt="10px">{errors.email}</ErrorText>
              )}
              <FormInput
                keyboardType="email-address"
                placeholder="Skype, phone, or email"
                mb="15px"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                values={values.email}
              />
              <Row>
                <Text>No Account?</Text>
                <TouchableOpacity onPress={() => this.gotoRegister()}>
                  <Text primary> Create one!</Text>
                </TouchableOpacity>
              </Row>
              <Row justify="flex-end" mt="40px">
                {this.state.isLoading === false ? (
                  <Button
                    title="Next"
                    textColor="white"
                    ml="5px"
                    onPress={handleSubmit}
                  />
                ) : (
                  <ActivityIndicator size="small" color={theme.primary} />
                )}
              </Row>
            </>
          )}
        </Formik>
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

export default Login
