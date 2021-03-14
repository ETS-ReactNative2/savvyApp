import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { HeaderWrapper } from './HeaderWrapper'
import { Text } from '../../styles/Typography'
import { connect } from 'react-redux'
import { getUserDetail } from '../../redux/actions/user.action'
import { logout } from '../../redux/actions/auth.action'
import { showMessage, hideMessage } from 'react-native-flash-message'

export class HeaderProfile extends Component {
  goBack() {
    this.props.goBack()
  }
  async componentDidMount() {
    await this.props.getUserDetail(this.props.auth.id)
  }
  logout() {
    this.props.logout()
    showMessage({
      message: 'Success to Logout',
      type: 'success',
      autoHide: true,
      duration: 5000,
    })
  }
  render() {
    console.log(this.props.auth.id)
    return (
      <HeaderWrapper>
        <TouchableOpacity onPress={() => this.goBack()}>
          <IconMaterial name="west" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text mr="10px">Sign out</Text>
        </TouchableOpacity>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
})

const mapDispatchToProps = { getUserDetail, logout }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile)
