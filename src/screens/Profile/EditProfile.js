import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
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
import CheckBox from 'react-native-check-box'
import { showMessage } from 'react-native-flash-message'

const Validation = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  phoneNumber: yup.number('must be a number').required('Phone is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`),
})

const WrapTextInput = (props) => {
  return (
    <View style={{ paddingTop: 20 }}>
      <Text mb="5px">{props.title}</Text>
      <TextInput {...props} />
    </View>
  )
}
export class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: true,
      isChecked: false,
      loading: false,
      message: '',
    }
  }
  async componentDidMount() {
    await this.props.userDetail(this.props.auth.token)
  }
  update = async (values) => {
    this.setState({ loading: true })
    const { token } = this.props.auth
    const { fullName, email, phoneNumber, password } = values
    await this.props.updateUser(token, {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    })
    if (this.props.user.message !== '') {
      this.setState({ loading: false })
      showMessage({
        message: this.props.user.message,
        type: 'success',
      })
      this.props.userDetail(this.props.auth.token)
    } else {
      this.setState({ loading: false })
      showMessage({
        message: this.props.user.errorMsg,
        type: 'success',
      })
    }
  }
  toggleCheckBox() {
    this.setState({
      isChecked: !this.state.isChecked,
      showPassword: !this.state.showPassword,
    })
  }
  render() {
    const { picture, email, fullName, phoneNumber } = this.props.user.detail
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
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
              password: '',
            }}
            validationSchema={Validation}
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
                {/* Name */}
                <WrapTextInput
                  title="Name"
                  placeholder="Add name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {errors.fullName && touched.fullName && (
                  <ErrorText mt="10px">{errors.fullName}</ErrorText>
                )}
                {/* Email */}
                <WrapTextInput
                  title="Email"
                  placeholder="Add Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <ErrorText mt="10px">{errors.email}</ErrorText>
                )}
                {/* Phone */}
                <WrapTextInput
                  title="Phone Number"
                  placeholder="Add Phone Number"
                  keyboardType="number-pad"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <ErrorText mt="10px">{errors.phoneNumber}</ErrorText>
                )}
                {/* Password */}
                <WrapTextInput
                  title="Password"
                  placeholder="Enter your new password"
                  secureTextEntry={this.state.showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <ErrorText mt="10px">{errors.password}</ErrorText>
                )}
                <CheckBox
                  style={{ paddingTop: 10 }}
                  checkedCheckBoxColor={`${theme.primary}`}
                  uncheckedCheckBoxColor="black"
                  onClick={() => this.toggleCheckBox()}
                  isChecked={this.state.isChecked}
                  rightText={'Show Password'}
                />
                {/* Submit */}
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#0279D5" />
                ) : (
                  <TouchableOpacity onPress={handleSubmit}>
                    <Button mt="40px" title="Save Change" textColor="white" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
        </Container>
      </ScrollView>
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
