import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import { Text } from '../styles/Typography'
import { connect } from 'react-redux'
import {
  chatBySender,
  sendChat,
  pagingChat,
} from '../redux/actions/chat.action'
import { recipientDetail } from '../redux/actions/user.action'
import io from '../helpers/socket'
import moment from 'moment'
import { showMessage } from '../helpers/showMessage'
import avatar from '../assets/images/avatar.jpg'

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
  async componentDidMount() {
    const { sender } = this.props.chat
    const { token } = this.props.auth
    this.props.chatBySender(token, sender)
    this.props.recipientDetail(token, sender)
  }
  isSendChat = async (recipient_id) => {
    const { token } = this.props.auth
    const { message } = this.state
    this.props.sendChat(token, message, recipient_id)
  }
  _next = async () => {
    const { currentPage, totalPage } = this.props.chat.pageInfoChat
    const { sender } = this.props.chat
    if (currentPage < totalPage) {
      await this.props.pagingChat(
        this.props.auth.token,
        sender,
        currentPage + 1,
      )
    }
  }
  render() {
    const { sender } = this.props.chat
    const { chatSender } = this.props.chat
    const { recipient } = this.props.user
    return (
      <Container p="0">
        <FlatList
          inverted={true}
          style={{ marginBottom: 70 }}
          data={chatSender}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const self = item.sender_id == sender
            return (
              <>
                {self ? (
                  <Row mt="5px">
                    <Image
                      style={styles.avatar}
                      source={
                        recipient.picture === null
                          ? avatar
                          : { uri: recipient.picture }
                      }
                    />
                    <View>
                      <Row>
                        <Text ml="5px" label size="12px">
                          {recipient.fullName},
                        </Text>
                        <Text ml="5px" label size="12px">
                          {moment(item.createdAt).format('HH:mm')}
                        </Text>
                      </Row>
                      <Row>
                        <LinearGradient
                          style={styles.wrapperLinear}
                          colors={['#0279D5', '#02BBF3']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}>
                          <TextChat>{item.message}</TextChat>
                        </LinearGradient>
                      </Row>
                    </View>
                  </Row>
                ) : (
                  <>
                    <Text align="right" mr="5px" label size="12px">
                      {moment(item.createdAt).format('HH:mm')}
                    </Text>
                    <Row justify="flex-end">
                      <WrapperChatSelf>
                        <TextChatSelf>{item.message}</TextChatSelf>
                      </WrapperChatSelf>
                    </Row>
                  </>
                )}
              </>
            )
          }}
          onEndReached={this._next}
          onEndReachedThreshold={0.5}
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
const WrapperChatSelf = styled.View`
  background-color: ${theme.inputbg};
  border-radius: 10px;
  border-top-right-radius: 0px;
  padding: 10px;
  margin: 5px;
`
const TextChatSelf = styled.Text`
  font-family: OpenSans-Regular;
`
const TextChat = styled.Text`
  font-family: OpenSans-Regular;
  color: white;
  flex: 1;
`

const styles = StyleSheet.create({
  avatar: {
    height: 45,
    width: 45,
    resizeMode: 'cover',
    borderRadius: 25,
    marginHorizontal: 5,
  },
  wrapSend: {
    marginTop: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  wrapperLinear: {
    backgroundColor: 'blue',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    padding: 10,
    margin: 5,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
})

const mapDispatchToProps = {
  chatBySender,
  sendChat,
  pagingChat,
  recipientDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
