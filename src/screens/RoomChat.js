import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Image, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import avatar from '../assets/images/avatar.png'
import { Text } from '../styles/Typography'
import { connect } from 'react-redux'
import { chatBySender, senderId, sendChat } from '../redux/actions/chat.action'

const IconButton = (props) => {
  return (
    <TouchableOpacity {...props}>
      <LinearGradient
        style={{ borderRadius: 25 }}
        colors={['#0279D5', '#02BBF3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Icon
          name={props.icon}
          size={props.size}
          color="white"
          style={{ padding: props.padding }}
        />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export class RoomChat extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }
  componentDidMount() {
    this.props.chatBySender(this.props.auth.token, this.props.chat.sender)
  }
  isSendChat = (recipient) => {
    this.props.sendChat(this.props.auth.token, this.state.message, recipient)
    this.props.chatBySender(this.props.auth.token, this.props.chat.sender)
  }
  render() {
    const { sender } = this.props.chat
    const { chatSender } = this.props.chat
    return (
      <Container p="0">
        <FlatList
          data={chatSender}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const self = item.sender_id == sender
            return (
              <Container p="10px">
                {self ? (
                  <Row>
                    <WrapperChat>
                      <TextChat>{item.message}</TextChat>
                    </WrapperChat>
                  </Row>
                ) : (
                  <Row>
                    <WrapperChatSelf>
                      <TextChat>{item.message}</TextChat>
                    </WrapperChatSelf>
                  </Row>
                )}
              </Container>
            )
          }}
        />
        <RowFooter>
          <IconButton icon="plus" size={25} padding={5} />
          <TextInput
            placeholder="Type a message"
            onChangeText={(message) => this.setState({ message: message })}
          />
          <IconButton
            icon="send"
            size={20}
            padding={10}
            onPress={() => this.isSendChat(sender)}
          />
        </RowFooter>
      </Container>
    )
  }
}
const TouchableOpacity = styled.TouchableOpacity`
  ${(props) =>
    props.disabled &&
    `
    background-color: black
  `}
`
const TextInput = styled.TextInput`
  border-radius: 25px;
  flex: 1;
  padding-horizontal: 20px;
  background-color: ${theme.inputbg};
  font-family: 'OpenSans-Regular';
  margin-horizontal: 5px;
`
const RowFooter = styled.View`
  background-color: white;
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const WrapperChat = styled.View`
  background-color: ${theme.inputbg};
  border-radius: 10px;
  border-top-right-radius: 0px;
  padding: 10px;
`
const WrapperChatSelf = styled.View`
  align-items: flex-end;
  background-color: blue;
  border-radius: 10px;
  border-top-right-radius: 0px;
  padding: 10px;
  text-align: right;
`
const TextChat = styled.Text`
  font-family: OpenSans-Regular;
`

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  wrapSend: {
    marginTop: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
})

const mapDispatchToProps = { chatBySender, senderId, sendChat }

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
