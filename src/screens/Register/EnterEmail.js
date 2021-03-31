import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, ErrorText } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import { connect } from 'react-redux'
import { checkData, userData } from '../../redux/actions/user.action'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import * as yup from 'yup'

const Validation = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
})

export class EnterEmail extends Component {
  state = {
    message: '',
  }
  save = async (values) => {
    await this.props.checkData({ email: values.email })
    if (this.props.user.errorMsg !== '') {
      showMessage({
        message: this.props.user.errorMsg,
        type: 'danger',
      })
    } else {
      await this.props.userData({ email: values.email })
      this.props.navigation.navigate('create-password', {
        getItem: values.email,
      })
    }
  }
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
        <Formik
          validateOnMount={true}
          validationSchema={Validation}
          initialValues={{ email: '' }}
          onSubmit={(values) => this.save(values)}>
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
                placeholder="someone@example.com"
                mt="10px"
                mb="15px"
                name="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
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
})

const mapDispatchToProps = { checkData, userData }

export default connect(mapStateToProps, mapDispatchToProps)(EnterEmail)
