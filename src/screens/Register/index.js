import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, ErrorText } from '../../styles/Typography'
import FormInput from '../../components/FormInput'
import styled from 'styled-components'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Container, Row } from '../../styles/ComponentStyle'
import Logo from '../../assets/images/logos/microsoft-logo.png'
import { getUserRegisterData } from '../../redux/actions/user.action'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ActivityIndicator } from 'react-native'
import { theme } from '../../styles/ThemeColor'
import { connect } from 'react-redux'

const Validation = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required'),
})

export class Register extends Component {
  save = (values) => {
    this.props.getUserRegisterData(values.phoneNumber)
    this.props.navigation.navigate('create-password')
  }
  gotoCreatePassword() {
    this.props.navigation.navigate('create-password')
  }
  gotoEnterEmail() {
    this.props.navigation.navigate('enter-email')
  }
  goBack() {
    this.props.navigation.goBack()
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
          initialValues={{ phoneNumber: '' }}
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
              {errors.phoneNumber && touched.phoneNumber && (
                <ErrorText mt="10px">{errors.phoneNumber}</ErrorText>
              )}
              <FormInput
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Phone number"
                mt="10px"
                mb="15px"
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={() => this.gotoEnterEmail()}>
                <Text primary>Use your email instead</Text>
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
const mapDispatchToProps = { getUserRegisterData }

export default connect(mapStateToProps, mapDispatchToProps)(Register)
