import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { Text } from '../styles/Typography'
import { connect } from 'react-redux'
import {
  userDetail,
  allUser,
  pagingContact,
} from '../redux/actions/user.action'
import { senderId } from '../redux/actions/chat.action'
import { theme } from '../styles/ThemeColor'

export class SearchScreen extends Component {
  state = {
    search: '',
    loading: false,
    message: '',
  }
  async componentDidMount() {
    await this.props.allUser(this.props.auth.token)
  }
  getChatView = async (sender) => {
    await this.props.senderId(sender)
    this.props.navigation.navigate('chat-room')
  }
  _next = async () => {
    const { currentPage, totalPage, nextLink } = this.props.user.pageInfoContact
    if (currentPage < totalPage) {
      if (nextLink !== null) {
        console.log(nextLink.replace('&undefined=', ''))
        const { search } = this.state
        await this.props.pagingContact(
          this.props.auth.token,
          search,
          currentPage + 1,
        )
      }
    }
    console.log(this.props.user.pageInfoContact)
  }
  search = async (value) => {
    this.setState({ loading: true, search: value })
    await this.props.allUser(this.props.auth.token, value)
    if (this.props.user.contact.length > 0) {
      this.setState({
        message: '',
        loading: false,
      })
    } else {
      this.setState({
        message: `${value} isn't Not Found`,
        loading: false,
      })
    }
  }
  render() {
    const { contact } = this.props.user
    return (
      <>
        <LinearGradient
          colors={['#0279D5', '#02BBF3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="west" color="white" size={30} />
            </TouchableOpacity>
            <TextInput
              selectionColor="white"
              placeholderTextColor="#b8dfff"
              placeholder="Search"
              style={styles.input}
              onChangeText={(value) => this.search(value)}
            />
          </View>
        </LinearGradient>
        <WrapperSpace>
          <Text p="10px" size="12px" bold label>
            PEOPLE
          </Text>
        </WrapperSpace>
        <Container p="10px">
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#0279D5" />
          ) : this.state.message !== '' ? (
            <Text align="center">{this.state.message}</Text>
          ) : contact.length > 0 ? (
            <FlatList
              data={contact}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Text ml="10px" bold>
                    {item.fullName}
                  </Text>
                )
              }}
              onEndReached={() => this._next()}
              onEndReachedThreshold={0.5}
            />
          ) : null}
        </Container>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingTop: 20,
  },
  input: {
    fontSize: 42,
    color: 'white',
    textShadowColor: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  img: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
})

const WrapperSpace = styled.View`
  background-color: #e8e8e8;
`

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
})

const mapDispatchToProps = { userDetail, allUser, pagingContact, senderId }

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
