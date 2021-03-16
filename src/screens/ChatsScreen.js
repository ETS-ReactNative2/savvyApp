import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '../styles/Typography'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Row } from '../styles/ComponentStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HeaderChats from '../components/Header/HeaderChats'
import { connect } from 'react-redux'
import {
  getUserDetail,
  getChatList,
  chatView,
  getSenderById,
} from '../redux/actions/user.action'

export class ChatsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    this.props.getChatList(this.props.auth.id)
  }
  getChatView = async (recipient, sender) => {
    await this.props.getSenderById(sender)
    await this.props.chatView(recipient, sender)
    this.props.navigation.navigate('chat-screen')
  }
  render() {
    const { chatHistory } = this.props.user
    return (
      <>
        <HeaderChats navigation={this.props.navigation} />
        <Container>
          {chatHistory.map((sender, idx) => {
            return (
              <Row mb="10px" key={String(sender)}>
                {sender !== this.props.auth.id.toString() && (
                  <>
                    <Image
                      source={{ uri: sender.picture }}
                      style={styles.img}
                    />
                    <RowChat>
                      <TouchableOpacity
                        onPress={() =>
                          this.getChatView(this.props.auth.id, sender)
                        }>
                        <View>
                          <Text size="20px" mb="3px">
                            {sender}
                          </Text>
                          <Text>Maybe Next time...</Text>
                        </View>
                      </TouchableOpacity>
                      <TextDate>2012/12/21</TextDate>
                    </RowChat>
                  </>
                )}
              </Row>
            )
          })}
        </Container>
      </>
    )
  }
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 10px;
`
const TextDate = styled.Text`
  text-align: right;
  flex: 1;
  font-size: 12px;
  color: ${theme.label};
`
const RowChat = styled.View`
  flex-direction: row;
  margin-left: 10px;
  flex: 1;
  padding-bottom: 15px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
`

const styles = StyleSheet.create({
  img: {
    height: 55,
    width: 55,
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

const mapDispatchToProps = {
  getUserDetail,
  getChatList,
  chatView,
  getSenderById,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
