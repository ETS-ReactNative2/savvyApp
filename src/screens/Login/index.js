import React, { Component } from 'react'
import { Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, ErrorText } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import { Formik } from 'formik'
import * as yup from 'yup'
import { userData, checkData } from '../../redux/actions/user.action'
import { connect } from 'react-redux'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { theme } from '../../styles/ThemeColor'

const Validation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
})

export class Login extends Component {
  state = {
    message: '',
    loading: false,
  }
  login = async (values) => {
    this.setState({ loading: true })
    await this.props.checkData({ email: values.email })
    if (this.props.user.errorMsg !== '') {
      await this.props.userData({ email: values.email })
      this.props.navigation.navigate('enter-password')
      this.setState({ loading: false })
    } else {
      showMessage({
        message: 'Email is not registered',
        type: 'danger',
      })
      this.setState({ loading: false })
    }
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
            errors,
            touched,
          }) => (
            <>
              {errors.email && touched.email && (
                <ErrorText mt="10px">{errors.email}</ErrorText>
              )}
              <FormInput
                name="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                placeholder="Skype, phone, or email"
                mb="15px"
              />
              <Row>
                <Text>No Account?</Text>
                <TouchableOpacity onPress={() => this.gotoRegister()}>
                  <Text primary> Create one!</Text>
                </TouchableOpacity>
              </Row>
              <Row justify="flex-end" mt="40px">
                {this.state.loading === false ? (
                  <Button
                    title="Sign in"
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

const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = { userData, checkData }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
