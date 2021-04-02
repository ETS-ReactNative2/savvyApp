import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { Text } from '../styles/Typography'
import { connect } from 'react-redux'
import { userDetail, allUser } from '../redux/actions/user.action'
import { senderId } from '../redux/actions/chat.action'
import { theme } from '../styles/ThemeColor'

export class SearchScreen extends Component {
  state = {
    search: '',
  }
  async componentDidMount() {
    this.props.allUser(this.props.auth.token)
  }
  getChatView = async (sender) => {
    await this.props.senderId(sender)
    this.props.navigation.navigate('chat-room')
  }
  next = async () => {
    if (
      this.props.user.pageInfoContact.currentPage <
      this.props.user.pageInfoContact.totalPage
    ) {
      const { search } = this.state
      await this.props.pagingGetContact(
        this.props.auth.token,
        search,
        this.props.user.pageInfoContact.currentPage + 1,
      )
    }
  }
  search = async (value) => {
    this.setState({ loading: true, search: value })
    await this.props.getContact(this.props.auth.token, value)
    if (this.props.user.allContact.length > 0) {
      this.setState({
        message: '',
        loading: false,
      })
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
      })
    }
  }
  render() {
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
            />
          </View>
        </LinearGradient>
        <WrapperSpace>
          <Text p="10px" size="12px" bold label>
            PEOPLE
          </Text>
        </WrapperSpace>
        <Container p="10px">
          <FlatList
            data={this.props.user.contact}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const self = this.props.user.userDetail.id !== item.id
              return (
                <>
                  {self && (
                    <View style={{ paddingBottom: 10 }}>
                      <WrapContact onPress={() => this.getChatView(item.id)}>
                        <Row mb="5px" align="center">
                          <Image
                            source={{ uri: item.picture }}
                            style={styles.img}
                          />
                          <Text ml="10px" bold>
                            {item.fullName}
                          </Text>
                        </Row>
                      </WrapContact>
                    </View>
                  )}
                </>
              )
            }}
            onEndReached={this.next}
            onEndReachedThreshold={0.5}
          />
        </Container>
      </>
    )
  }
}

const WrapContact = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
`

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
})

const mapDispatchToProps = { userDetail, allUser, senderId }

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
