import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { ErrorText, Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import Icon from 'react-native-vector-icons/Feather'
import CheckBox from 'react-native-check-box'
import { theme } from '../../styles/ThemeColor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { login, autoLogin } from '../../redux/actions/auth.action'
import { showMessage, hideMessage } from 'react-native-flash-message'

const Validation = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

export class EnterPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: true,
      isChecked: false,
      message: '',
      isLoading: false,
    }
  }
  componentDidMount() {
    this.props.getUserData()
  }
  toggleCheckBox() {
    this.setState({
      isChecked: !this.state.isChecked,
      showPassword: !this.state.showPassword,
    })
  }
  login = async (values) => {
    const { email } = this.props.user.userData
    this.setState({ isLoading: true })
    await this.props.login(email, values.password)
    if (typeof this.props.auth.token === 'string') {
      this.setState({ isLoading: true })
      showMessage({
        message: 'Success to login',
        type: 'success',
      })
      this.setState({ isLoading: false })
      this.props.navigation.navigate('home-screen')
    } else {
      this.setState({ isLoading: false })
      showMessage({
        message: 'Wrong Password',
        type: 'danger',
      })
    }
  }
  componentDidMount() {
    const token = AsyncStorage.getItem('token')
    if (token) {
      this.props.autoLogin(token)
      console.log(token)
    }
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
          <Text ml="10px">{this.props.user.userData.email}</Text>
        </Row>
        <Text bold size="24px">
          Enter Password
        </Text>
        <Formik
          validateOnMount={true}
          validationSchema={Validation}
          initialValues={{ password: '' }}
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
              {errors.password && touched.password && (
                <ErrorText mt="10px">{errors.password}</ErrorText>
              )}
              <FormInput
                placeholder="Password"
                mt="10px"
                mb="15px"
                secureTextEntry={this.state.showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
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
                {this.state.isLoading === false ? (
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
  auth: state.auth,
  user: state.user,
})
const mapDispatchToProps = { login, autoLogin }

export default connect(mapStateToProps, mapDispatchToProps)(EnterPassword)
