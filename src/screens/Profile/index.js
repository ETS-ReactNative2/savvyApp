import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'
import { theme } from '../../styles/ThemeColor'
import { Text } from '../../styles/Typography'
import HeaderProfile from '../../components/Header/HeaderProfile'
import { connect } from 'react-redux'
import { getUserDetail } from '../../redux/actions/user.action'
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalContent,
} from 'react-native-modals'
import * as ImagePicker from 'react-native-image-picker'
import { updateUser } from '../../redux/actions/user.action'
import { showMessage, hideMessage } from 'react-native-flash-message'

export const WrapperManage = (props) => {
  return (
    <TouchableOpacity {...props}>
      <WrapperForm>
        <Row align="center">
          <WrapperIcon>
            <IconFeather style={styles.icon} name={props.leftIcon} size={18} />
          </WrapperIcon>
          <Text>{props.title}</Text>
        </Row>
      </WrapperForm>
    </TouchableOpacity>
  )
}

export const WrapperManageCol = (props) => {
  return (
    <WrapperForm>
      <Row align="center">
        <WrapperIcon>
          <IconMaterial style={styles.icon} name={props.leftIcon} size={18} />
        </WrapperIcon>
        <View>
          <Text>{props.title}</Text>
          <Text size="12px" label>
            {props.desc}
          </Text>
        </View>
      </Row>
    </WrapperForm>
  )
}

export const WrapperProfile = (props) => {
  return (
    <Wrapper>
      <Row align="center" justify="space-between">
        <Row align="center">
          <WrapperIcon>
            <IconAwesome
              style={styles.icon}
              color={props.color}
              name={props.leftIcon}
              size={18}
            />
          </WrapperIcon>
          {props.children}
        </Row>
        <IconFeather style={styles.icon} name={props.rightIcon} size={18} />
      </Row>
    </Wrapper>
  )
}

export class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      message: '',
      visible: false,
    }
  }
  componentDidMount() {
    this.props.auth
  }
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response)

      try {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        }
        this.props.updateUser(this.props.auth.token, this.props.auth.id, {
          picture: image,
        })
        if (this.props.user.messageUpdate !== '') {
          showMessage({
            message: this.props.user.messageUpdate,
            type: 'success',
            autoHide: true,
            duration: 5000,
          })
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri,
          })
          this.setState({ visible: false })
        } else {
          showMessage({
            message: this.props.user.errorMsg,
            type: 'warning',
            autoHide: true,
            duration: 5000,
          })
          this.setState({ visible: false })
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
        this.setState({ visible: false })
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
        this.setState({ visible: false })
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        this.setState({ visible: false })
      } else {
        const image = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        }
        this.props.updateUser(this.props.auth.token, this.props.auth.id, {
          picture: image,
        })
        showMessage({
          message: this.props.auth.message,
          type: 'success',
          autoHide: true,
          duration: 5000,
        })
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        })
        this.setState({ visible: false })
      }
    })
  }

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{ uri: this.props.user.userDetail.picture }}
          style={styles.images}
        />
      )
    } else {
      return (
        <Image
          source={{ uri: this.props.user.userDetail.picture }}
          style={styles.images}
        />
      )
    }
  }

  renderFileUri() {
    const { picture } = this.props.user.userDetail
    if (this.state.fileUri) {
      return <Image source={{ uri: this.state.fileUri }} style={styles.img} />
    } else {
      return <Image source={{ uri: picture }} style={styles.img} />
    }
  }

  componentDidMount() {
    this.props.getUserDetail(this.props.auth.id)
  }
  render() {
    const { fullName, email, picture } = this.props.user.userDetail
    const ShowModal = () => {
      return (
        <Modal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false })
          }}>
          <ModalContent>
            <TouchableOpacity
              style={styles.imgModal}
              onPress={this.launchCamera}>
              <Text semibold>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgModal}
              onPress={this.chooseImage}>
              <Text semibold>Upload Photo</Text>
            </TouchableOpacity>
          </ModalContent>
        </Modal>
      )
    }
    return (
      <>
        <HeaderProfile navigation={this.props.navigation} />
        <Layout>
          <Container>
            <Row mt="10px" mb="20px">
              <TouchableOpacity
                onPress={() => {
                  this.setState({ visible: true })
                }}>
                <View>{this.renderFileUri()}</View>
              </TouchableOpacity>
              <ShowModal />
              <View>
                <Text bold size="16px">
                  {fullName}
                </Text>
                <Text size="12px">{email}</Text>
                <Text size="12px" mt="10px" primary>
                  My Microsoft account
                </Text>
              </View>
            </Row>
            <WrapperProfile
              leftIcon="circle"
              color="#00d95e"
              rightIcon="chevron-down">
              <Text>Active</Text>
            </WrapperProfile>
            <WrapperProfile leftIcon="bullhorn" rightIcon="edit-2">
              <TextInput placeholder="Share what you're up to" />
            </WrapperProfile>
            <WrapperManage leftIcon="bookmark" title="Bookmarks" />
          </Container>
          <WrapperSpace>
            <Text p="5px 10px" size="12px" bold label>
              MANAGE
            </Text>
          </WrapperSpace>
          <Container>
            <WrapperManage
              leftIcon="user"
              title="Skype Profile"
              onPress={() => this.props.navigation.navigate('manage-profile')}
            />
            <WrapperManageCol
              leftIcon="phone"
              title="Skype to Phone"
              desc="Call phones at affordable rates"
            />
            <WrapperManageCol
              leftIcon="dialpad"
              title="Skype Number"
              desc="Get a second number"
            />
            <WrapperManage leftIcon="settings" title="Settings" />
          </Container>
        </Layout>
      </>
    )
  }
}
const Wrapper = styled.View`
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  padding-bottom: 5px;
`
const WrapperSpace = styled.View`
  background-color: #e8e8e8;
`
const WrapperForm = styled.View`
  padding-bottom: 10px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  margin-top: 10px;
`
const WrapperIcon = styled.View`
  margin-right: 10px;
`
const Container = styled.View`
  background-color: #fff;
  padding: 0 10px;
`
const Layout = styled.View`
  flex: 1;
  background: white;
`

const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
    borderRadius: 100,
    marginRight: 20,
  },
  icon: {
    padding: 10,
  },
  imgModal: {
    paddingVertical: 10,
    width: 200,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { getUserDetail, updateUser }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
