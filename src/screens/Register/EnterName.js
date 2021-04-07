import React, { Component } from 'react'
import { Image, StyleSheet, ActivityIndicator } from 'react-native'
import { ErrorText, Text } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import { theme } from '../../styles/ThemeColor'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import {
  updateUser,
  userDetail,
  userData,
} from '../../redux/actions/user.action'
import { register } from '../../redux/actions/auth.action'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage, hideMessage } from 'react-native-flash-message'

const Validation = yup.object().shape({
  fullName: yup.string().required('Name is required'),
})
export class EnterName extends Component {
  state = {
    message: '',
    loading: false,
  }
  gotoLogin() {
    this.props.navigation.navigate('login')
  }
  goBack() {
    this.props.navigation.goBack()
  }
  componentDidMount() {
    this.props.userData()
  }
  isRegister = async (values) => {
    this.setState({ loading: true })
    const { email } = this.props.user.userData
    const { getPassword } = this.props.route.params
    await this.props.register({
      email: email,
      password: getPassword,
      fullName: values.fullName,
    })
    if (this.props.auth.message !== '') {
      this.setState({ loading: true })
      showMessage({
        message: this.props.auth.message,
        type: 'success',
      })
      this.props.navigation.navigate('login')
      this.setState({ loading: false })
    } else {
      this.setState({ loading: true })
      showMessage({
        message: this.props.auth.errorMsg,
        type: 'danger',
      })
      this.setState({ loading: false })
    }
  }
  render() {
    return (
      <Container>
        <Formik
          validateOnMount={true}
          validationSchema={Validation}
          initialValues={{ fullName: '' }}
          onSubmit={(values) => this.isRegister(values)}>
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
              <Image source={Logo} style={styles.logo} />
              <Row mt="10px" mb="10px" align="center">
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Icon name="arrow-left" size={24} />
                </TouchableOpacity>
                <Text ml="10px">{this.props.user.userData.email}</Text>
              </Row>
              <Text bold size="24px">
                What's your name?
              </Text>
              <Text mt="10px" size="15px">
                We need a little more info before you can use this app
              </Text>
              {errors.fullName && touched.fullName && (
                <ErrorText mt="10px">{errors.fullName}</ErrorText>
              )}
              <FormInput
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                placeholder="Your Name"
                mt="10px"
              />
              <Row justify="flex-end" mt="40px">
                {this.state.loading === false ? (
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { updateUser, userDetail, userData, register }

export default connect(mapStateToProps, mapDispatchToProps)(EnterName)
