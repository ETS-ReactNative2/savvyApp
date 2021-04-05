import React, { Component } from 'react'
import { View } from 'react-native'
import { Container } from '../../styles/ComponentStyle'
import { updateUser, userDetail } from '../../redux/actions/user.action'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ErrorText, Text } from '../../styles/Typography'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { theme } from '../../styles/ThemeColor'
import Button from '../../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { showMessage } from '../../helpers/showMessage'

const Validation = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  phoneNumber: yup.string().required('Phone is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
})

const WrapTextInput = (props) => {
  return (
    <View style={{ paddingTop: 20 }}>
      <Text mb="5px">{props.title}</Text>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
      />
    </View>
  )
}
export class EditProfile extends Component {
  state = {
    message: '',
  }
  componentDidMount() {
    this.props.userDetail(this.props.auth.token)
  }
  update = (values) => {
    this.props.updateUser(this.props.auth.token, {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    })
    if (this.props.user.updateMessage !== '') {
      showMessage(this.props.user.updateMessage, 'success')
    } else {
      showMessage(this.props.user.errorMsg)
    }
  }
  render() {
    const { picture, email, fullName, phoneNumber } = this.props.user.detail
    return (
      <Container p="10px">
        <Text size="24px">Personal Information</Text>
        <Text mb="10px" mt="10px">
          This is what others will see on your Savvy profile.
        </Text>
        <Formik
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
            errors,
            touched,
          }) => (
            <>
              <WrapTextInput
                title="Name"
                placeholder="Add name"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              <WrapTextInput
                title="Email"
                placeholder="Add Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <WrapTextInput
                title="Phone Number"
                placeholder="Add Phone Number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Button mt="40px" title="Save Change" textColor="white" />
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Container>
    )
  }
}

const TextInput = styled.TextInput`
  border-width: 1.5px;
  height: 40px;
  padding-left: 10px;
  border-color: ${theme.primary};
  font-family: 'OpenSans-Regular';
`

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { updateUser, userDetail }

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
