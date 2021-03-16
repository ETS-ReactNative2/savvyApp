import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import avatar from '../assets/images/avatar.png'
import { Text } from '../styles/Typography'
import { connect } from 'react-redux'
import { sendChat, chatView, getSenderById } from '../redux/actions/user.action'

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
    await this.props.getSenderById()
    await this.props.chatView(recipient, sender)
  }
  isSendChat(recipient) {
    this.props.sendChat(recipient, this.props.auth.id, this.state.message)
    this.props.getSenderById()
    this.props.chatView(recipient, this.props.auth.id)
    console.log(recipient, this.state.message)
  }
  render() {
    const { senderChatList } = this.props.user
    const { senderId } = this.props.user
    return (
      <Container p="0">
        <ScrollView style={{ marginBottom: 70 }}>
          {senderChatList.map((item, index) => {
            const self = item.from === senderId
            return (
              <Container p="10px">
                {self ? (
                  <Row>
                    <Image source={avatar} style={styles.avatar} />
                    <View>
                      <View>
                        <Text size="12px" label>
                          {item.from}
                        </Text>
                        <LinearGradient
                          style={styles.wrapSend}
                          colors={['#0279D5', '#02BBF3']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}>
                          <Text white p="10px" semibold>
                            {item.message}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </Row>
                ) : (
                  <Row justify="flex-end">
                    <View style={styles.wrapGet}>
                      <Text>{item.message}</Text>
                    </View>
                  </Row>
                )}
              </Container>
            )
          })}
        </ScrollView>
        {senderChatList.map((item) => {
          const self = item.from === senderId
          return (
            <>
              {self && (
                <RowFooter>
                  <IconButton icon="plus" size={25} padding={5} />
                  <TextInput
                    placeholder="Type a message"
                    onChangeText={(message) =>
                      this.setState({ message: message })
                    }
                  />
                  <IconButton
                    icon="send"
                    size={20}
                    padding={10}
                    onPress={() => this.isSendChat(item.from)}
                  />
                </RowFooter>
              )}
            </>
          )
        })}
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
  wrapGet: {
    backgroundColor: theme.inputbg,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    padding: 10,
  },
})

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatchToProps = { sendChat, chatView, getSenderById }

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
