import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Text } from '../styles/Typography'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Row } from '../styles/ComponentStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { userDetail } from '../redux/actions/user.action'
import { chatView, senderId } from '../redux/actions/chat.action'
import HeaderChats from '../components/Header/HeaderChats'
import moment from 'moment'

export class ChatsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    this.props.chatView(this.props.auth.token)
  }
  getChatView = async (sender_id) => {
    await this.props.senderId(sender_id)
    this.props.navigation.navigate('chat-room')
  }
  render() {
    return (
      <>
        <HeaderChats navigation={this.props.navigation} />
        <Container>
          <FlatList
            data={this.props.chat.chatHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Row mb="10px" key={String(item)}>
                  <Image source={{ uri: item.picture }} style={styles.img} />
                  <RowChat>
                    <TouchableOpacity onPress={() => this.getChatView(item)}>
                      <View>
                        <Text size="20px" mb="3px">
                          {item}
                        </Text>
                        <Text>{item}</Text>
                      </View>
                    </TouchableOpacity>
                    <TextDate>{moment(item).format('HH:mm')}</TextDate>
                  </RowChat>
                </Row>
              )
            }}
          />
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
  chat: state.chat,
})

const mapDispatchToProps = {
  userDetail,
  chatView,
  senderId,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
