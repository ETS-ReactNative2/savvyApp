import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import styled from 'styled-components'
import { Container, Row } from '../../styles/ComponentStyle'
import LinearGradient from 'react-native-linear-gradient'
import { ErrorText, Text } from '../../styles/Typography'
import { theme } from '../../styles/ThemeColor'
import { connect } from 'react-redux'
import { updateUser, getUserDetail } from '../../redux/actions/user.action'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import * as yup from 'yup'

const Validation = yup.object().shape({
  fullName: yup.string(),
  phoneNumber: yup.string(),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
})

export const WrapperManage = (props) => {
  return (
    <TouchableOpacity>
      <Wrapper>
        <Row align="center" justify="space-between">
          <Row align="center">
            {props.children}
            <Text ml="10px" bold>
              {props.title}
            </Text>
          </Row>
          <TextInputProfile
            keyboardType={props.keyboardType}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            value={props.value}
            onBlur={props.onBlur}
            onChangeText={props.onChangeText}
          />
        </Row>
      </Wrapper>
    </TouchableOpacity>
  )
}

export class ManageProfile extends Component {
  state = {
    message: '',
    autoHide: false,
  }
  componentDidMount() {
    this.props.getUserDetail(this.props.auth.id)
  }
  update = (values) => {
    this.props.updateUser(this.props.auth.token, this.props.auth.id, {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    })
    this.props.getUserDetail(this.props.auth.id)
    if (this.props.user.messageUpdate !== '') {
      showMessage({
        message: this.props.user.messageUpdate,
        type: 'success',
        autoHide: true,
        duration: 5000,
      })
    } else {
      showMessage({
        message: this.props.user.errorMsg,
        type: 'warning',
        autoHide: true,
        duration: 5000,
      })
    }
  }
  render() {
    const { picture, email, fullName, phoneNumber } = this.props.user.userDetail
    return (
      <LinearGradient
        colors={['#0279D5', '#02BBF3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <ScrollView style={{}}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity>
              <IconMaterial name="west" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Row justify="center">
            <Image source={{ uri: picture }} style={styles.img} />
          </Row>
          <Formik
            validateOnMount={true}
            validationSchema={Validation}
            initialValues={{
              fullName: fullName,
              email: email,
              phoneNumber: phoneNumber,
            }}
            onSubmit={(values) => this.update(values)}>
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
              <Container p="10px" style={{ marginTop: -20 }}>
                <Row align="center" justify="center" mt="10px">
                  {errors.fullName && touched.fullName && (
                    <ErrorText mt="10px">{errors.fullName}</ErrorText>
                  )}
                  <TextInputName
                    placeholder="Your Name"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleSubmit}
                    value={values.fullName}
                  />
                  <TouchableOpacity onPress={handleSubmit}>
                    <IconFeather
                      name="edit-2"
                      size={25}
                      color={theme.placeholder}
                    />
                  </TouchableOpacity>
                </Row>
                <WrapperManage title="Share profile">
                  <IconFeather name="share-2" size={25} />
                </WrapperManage>
                {/* Profile */}
                <Text mt="20px" bold label size="12px">
                  PROFILE
                </Text>
                <WrapperManage
                  title="Skype Name"
                  defaultValue="live:cid:6484894fawf48">
                  <IconAnt name="contacts" size={25} />
                </WrapperManage>

                {errors.email &&
                  touched.email &&
                  showMessage({
                    message: errors.email,
                    type: 'warning',
                    autoHide: true,
                    duration: 5000,
                  })}
                <WrapperManage
                  title="Email"
                  placeholder="Enter your e-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleSubmit}
                  value={values.email}>
                  <IconFeather name="mail" size={25} />
                </WrapperManage>
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  showMessage({
                    message: errors.phoneNumber,
                    type: 'warning',
                    autoHide: true,
                    duration: 5000,
                  })}
                <WrapperManage
                  title="Phone Number"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleSubmit}
                  value={values.phoneNumber}
                  keyboardType="number-pad">
                  <IconFeather name="phone" size={25} />
                </WrapperManage>
                {/* Other */}
                <Text mt="20px" bold label size="12px">
                  OTHER
                </Text>
                <WrapperManage title="Other ways people can find you">
                  <IconFeather name="users" size={25} />
                </WrapperManage>
                <WrapperManage title="Help & Feedback">
                  <IconFeather name="alert-circle" size={25} />
                </WrapperManage>
              </Container>
            )}
          </Formik>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const Image = styled.Image`
  z-index: 1;
`
const TextInputName = styled.TextInput`
  font-family: 'OpenSans-Bold';
  font-size: 24px;
`
const TextInputProfile = styled.TextInput`
  font-family: 'OpenSans-Regular';
  color: ${theme.placeholder};
`
const Wrapper = styled.View`
  padding-bottom: 5px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  margin-top: 20px;
`
const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: 40,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { updateUser, getUserDetail }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile)
