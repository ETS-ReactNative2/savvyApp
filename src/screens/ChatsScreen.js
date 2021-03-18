import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '../styles/Typography'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Row } from '../styles/ComponentStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import {
  getUserDetail,
  getChatList,
  chatView,
  getSenderById,
} from '../redux/actions/user.action'
import HeaderChats from '../components/Header/HeaderChats'
import moment from 'moment'

export class ChatsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    this.props.getChatList(this.props.auth.id)
  }
  getChatView = async (recipient_id, sender_id) => {
    await this.props.getSenderById(sender_id)
    await this.props.chatView(sender_id, recipient_id)
    this.props.navigation.navigate('chat-screen')
  }
  render() {
    const { chatHistory } = this.props.user
    return (
      <>
        <HeaderChats navigation={this.props.navigation} />
        <Container>
          {chatHistory.map((item, idx) => {
            console.log(item.sender_id) // 47
            return (
              <Row mb="10px" key={String(item)}>
                {item.sender_id !== this.props.auth.id && (
                  <>
                    <Image source={{ uri: item.picture }} style={styles.img} />
                    <RowChat>
                      <TouchableOpacity
                        onPress={() =>
                          this.getChatView(this.props.auth.id, item.sender_id)
                        }>
                        <View>
                          <Text size="20px" mb="3px">
                            {item.recipientName}
                          </Text>
                          <Text>{item.message}</Text>
                        </View>
                      </TouchableOpacity>
                      <TextDate>
                        {moment(item.createdAt).format('HH:mm')}
                      </TextDate>
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
