import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '../styles/Typography'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Container, Row } from '../styles/ComponentStyle'
import HeaderChats from '../components/Header/HeaderChats'
import { connect } from 'react-redux'
import {
  getUserDetail,
  getChatList,
  chatView,
} from '../redux/actions/user.action'
import http from '../helpers/http'
import HeaderContacts from '../components/Header/HeaderContacts'

export class ContactsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedAs: '',
      allUser: [],
    }
  }
  async componentDidMount() {
    const response = await http().get('/users')
    this.setState({ allUser: response.data.results })
  }
  getChatView = async (recipient, sender) => {
    await this.props.chatView(recipient, sender)
    this.props.navigation.navigate('room-chat-screen')
  }
  render() {
    return (
      <>
        <HeaderContacts navigation={this.props.navigation} />
        <Container p="10px">
          {this.state.allUser.map((recipient, idx) => (
            <Row mb="20px" key={String(recipient)} align="center">
              <Image source={{ uri: recipient.picture }} style={styles.img} />
              <TouchableOpacity onPress={() => this.getChatView(recipient)}>
                <Text bold>{recipient.fullName}</Text>
              </TouchableOpacity>
            </Row>
          ))}
        </Container>
      </>
    )
  }
}

const TouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
  flex: 1;
  padding-bottom: 10px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
`

const styles = StyleSheet.create({
  img: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  icon: {
    paddingLeft: 20,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { getUserDetail, getChatList, chatView }

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
