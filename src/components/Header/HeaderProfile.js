import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { HeaderWrapper } from './HeaderWrapper'
import { Text } from '../../styles/Typography'
import { connect } from 'react-redux'
import { userDetail } from '../../redux/actions/user.action'
import { logout } from '../../redux/actions/auth.action'
import { showMessage, hideMessage } from 'react-native-flash-message'

export class HeaderProfile extends Component {
  goBack() {
    this.props.navigation.goBack()
  }
  async componentDidMount() {
    await this.props.userDetail(this.props.auth.id)
  }
  logout() {
    this.props.logout()
    showMessage({
      message: 'Success to Logout',
      type: 'success',
    })
  }
  render() {
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

const mapDispatchToProps = { userDetail, logout }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile)
