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
} from '../redux/actions/user.action'
import http from '../helpers/http'

export class ChatsScreen extends Component {
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
    this.props.navigation.navigate('chat-screen')
  }
  render() {
    const { chatList } = this.props.user
    const { email } = this.props.user.userDetail
    return (
      <>
        <HeaderChats navigation={this.props.navigation} />
        <Container>
          {this.state.allUser.map((recipient, idx) => (
            <Row mb="10px" key={String(recipient)}>
              <Image source={{ uri: recipient.picture }} style={styles.img} />
              <RowChat>
                <TouchableOpacity onPress={() => this.getChatView(recipient)}>
                  <View>
                    <Text size="20px" mb="3px">
                      {recipient.fullName}
                    </Text>
                    <Text>Maybe Next time...</Text>
                  </View>
                </TouchableOpacity>
                <TextDate>2012/12/21</TextDate>
              </RowChat>
            </Row>
          ))}
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

const mapDispatchToProps = { getUserDetail, getChatList, chatView }

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
