import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconFeather from 'react-native-vector-icons/Feather'
import { theme } from '../../styles/ThemeColor'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'
import { connect } from 'react-redux'
import { getUserDetail } from '../../redux/actions/user.action'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { Text } from '../../styles/Typography'
export class HeaderHome extends Component {
  gotoProfile() {
    this.props.navigation.navigate('profileScreen')
  }
  componentDidMount() {
    this.props.getUserDetail(this.props.auth.id)
  }
  render() {
    const { picture } = this.props.user.userDetail
    const Popup = () => {
      return (
        <Menu style={styles.icon}>
          <MenuTrigger text={<IconFeather name="more-vertical" size={24} />} />
          <MenuOptions>
            <MenuOption
              style={{ padding: 10 }}
              onSelect={() => alert(`Sort By Newest`)}
              text="Sort By Newest"
            />
            <MenuOption
              style={{ padding: 10 }}
              onSelect={() => alert(`Sort By Name`)}
              text="Sort By Name"
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
            <TouchableOpacity onPress={() => this.gotoProfile()}>
              <Image source={{ uri: picture }} style={styles.avatar} />
            </TouchableOpacity>
            <IconFeather style={styles.icon} name="video" size={24} />
            <IconFeather style={styles.icon} name="search" size={24} />
            {/* <IconFeather style={styles.icon} name="more-vertical" size={24} /> */}
            <Popup />
          </Row>
        </Row>
      </ContainerColor>
    )
  }
}

const ContainerColor = styled.View`
  background-color: #fff;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`

const styles = StyleSheet.create({
  img: {
    height: 50,
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
})

const mapDispatchToProps = { getUserDetail }

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
