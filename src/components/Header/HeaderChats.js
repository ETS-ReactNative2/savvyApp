import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconFeather from 'react-native-vector-icons/Feather'
import { theme } from '../../styles/ThemeColor'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'
import { connect } from 'react-redux'
import { userDetail } from '../../redux/actions/user.action'
import { chatView, sortChat } from '../../redux/actions/chat.action'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import avatar from '../../assets/images/avatar.jpg'
export class HeaderChats extends Component {
  state = {
    sort: 'DESC',
  }
  componentDidMount() {
    this.props.userDetail(this.props.auth.token)
  }
  gotoProfile = () => {
    this.props.navigation.navigate('profileScreen')
  }
  gotoSearch = () => {
    this.props.navigation.navigate('search-screen')
  }
  _sort = async (sort) => {
    await this.props.sortChat(sort)
    this.props.chatView(this.props.auth.token, '', sort)
  }
  render() {
    const { picture } = this.props.user.detail
    const Popup = () => {
      return (
        <Menu style={styles.icon}>
          <MenuTrigger text={<IconFeather name="more-vertical" size={24} />} />
          <MenuOptions>
            <MenuOption
              style={{ padding: 10 }}
              value="ASC"
              onSelect={(value) => this._sort(value)}
              text="Sort By Old"
            />
            <MenuOption
              style={{ padding: 10 }}
              value="DESC"
              onSelect={(value) => this._sort(value)}
              text="Sort By Newest"
            />
          </MenuOptions>
        </Menu>
      )
    }
    return (
      <ContainerColor>
        <Row align="center" justify="space-between">
          <IconFeather name="bell" size={24} />
          <Row align="center">
            <TouchableOpacity onPress={this.gotoProfile}>
              <Image
                source={picture === null ? avatar : { uri: picture }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <IconFeather style={styles.icon} name="video" size={24} />
            <TouchableOpacity onPress={this.gotoSearch}>
              <IconFeather style={styles.icon} name="search" size={24} />
            </TouchableOpacity>
            <Popup />
          </Row>
        </Row>
      </ContainerColor>
    )
  }
}

const ContainerColor = styled.View`
  background-color: #fff;
  padding: 8px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  icon: {
    marginLeft: 20,
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = { userDetail, chatView, sortChat }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderChats)
