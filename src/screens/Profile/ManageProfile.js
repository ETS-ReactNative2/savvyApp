import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Modal } from 'react-native'
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
import { updateUser, userDetail } from '../../redux/actions/user.action'
import { showMessage, hideMessage } from 'react-native-flash-message'
import avatar from '../../assets/images/avatar.jpg'
import Button from '../../components/Button'

export const WrapperManage = (props) => {
  return (
    <View>
      <Wrapper>
        <Row align="center" justify="space-between">
          <Row align="center">
            {props.children}
            <Text ml="10px" bold>
              {props.title}
            </Text>
          </Row>
          <TouchableOpacity onPress={props.onPress}>
            <Text label>{props.value}</Text>
          </TouchableOpacity>
        </Row>
      </Wrapper>
    </View>
  )
}

export class ManageProfile extends Component {
  state = {
    message: '',
    autoHide: false,
    modalVisible: false,
  }
  componentDidMount() {
    this.props.userDetail(this.props.auth.token)
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }
  gotoEdit = () => {
    this.props.navigation.navigate('edit-screen')
    this.setState({ modalVisible: false })
  }
  update = async (values) => {
    await this.props.updateUser(this.props.auth.token, {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    })
    if (this.props.user.errorMsg !== '') {
      showMessage({
        message: this.props.user.errorMsg,
        type: 'warning',
      })
    } else {
      showMessage({
        message: this.props.user.message,
        type: 'success',
      })
    }
    await this.props.userDetail(this.props.auth.token)
  }
  render() {
    const { picture, email, fullName, phoneNumber } = this.props.user.detail
    const { modalVisible } = this.state
    return (
      <LinearGradient
        colors={['#0279D5', '#02BBF3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <ScrollView style={{}}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <IconMaterial name="west" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Row justify="center">
            <Image
              source={picture === null ? avatar : { uri: picture }}
              style={styles.img}
            />
          </Row>
          <Container p="10px" style={{ marginTop: -20 }}>
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <Row align="center" justify="center">
                <Text align="center" bold size="24px" mt="30px" mr="10px">
                  {fullName}
                </Text>
                <IconFeather
                  name="edit-2"
                  size={24}
                  color={theme.placeholder}
                />
              </Row>
            </TouchableOpacity>
            <WrapperManage title="Share profile">
              <IconFeather name="share-2" size={25} />
            </WrapperManage>
            {/* Profile */}
            <Text mt="20px" bold label size="12px">
              PROFILE
            </Text>
            <WrapperManage
              onPress={() => this.setModalVisible(true)}
              title="Skype Name"
              value="live:cid:6484894fawf48">
              <IconAnt name="contacts" size={25} />
            </WrapperManage>
            <WrapperManage
              onPress={() => this.setModalVisible(true)}
              title="Email Address"
              value={email}>
              <IconFeather name="mail" size={25} />
            </WrapperManage>
            <WrapperManage
              title="Phone Number"
              onPress={() => this.setModalVisible(true)}
              title="Phone Number"
              value={phoneNumber ? phoneNumber : 'Add phone number'}
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible)
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.rowModal}>
                <Button title="Edit" variant="white" onPress={this.gotoEdit} />
                <View style={styles.gapModal} />
                <Button
                  variant="white"
                  title="Copy"
                  onPress={() => this.setModalVisible(false)}
                />
                <View style={styles.gapModal} />
                <Button
                  textColor="white"
                  title="Close"
                  onPress={() => this.setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginLeft: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
  },
  phone: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginBottom: 45,
  },
  gap: {
    height: 25,
  },
  gapModal: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  rowModal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { updateUser, userDetail }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile)
