import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text, ErrorText } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import Icon from 'react-native-vector-icons/Feather'
import CheckBox from 'react-native-check-box'
import { theme } from '../../styles/ThemeColor'
import { connect } from 'react-redux'
import { register } from '../../redux/actions/auth.action'
import { userData } from '../../redux/actions/user.action'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage, hideMessage } from 'react-native-flash-message'

const Validation = yup.object().shape({
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})
export class CreatePassword extends Component {
  state = {
    showPassword: true,
    isChecked: false,
    message: '',
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
  componentDidMount() {
    this.props.userData()
  }
  isRegister = async (values) => {
    this.props.navigation.navigate('enter-name', {
      getPassword: values.password,
    })
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
                  onPress={handleSubmit}
                />
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
  auth: state.auth,
})

const mapDispatchToProps = { register, userData }

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword)
