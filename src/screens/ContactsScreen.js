import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Text } from '../styles/Typography'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Container, Row } from '../styles/ComponentStyle'
import { connect } from 'react-redux'
import {
  userDetail,
  allUser,
  pagingContact,
} from '../redux/actions/user.action'
import { senderId } from '../redux/actions/chat.action'

export class ContactsScreen extends Component {
  state = {
    loading: false,
    message: '',
  }
  async componentDidMount() {
    this.props.allUser(this.props.auth.token)
  }
  getChatView = async (sender) => {
    await this.props.senderId(sender)
    this.props.navigation.navigate('chat-room')
  }
  nextContact = async () => {
    if (
      this.props.user.pageInfoContact.currentPage <
      this.props.user.pageInfoContact.totalPage
    ) {
      const { search } = this.state
      await this.props.pagingContact(
        this.props.auth.token,
        search,
        this.props.user.pageInfoContact.currentPage + 1,
      )
    }
  }
  render() {
    return (
      <Container p="10px">
        <FlatList
          data={this.props.user.contact}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const self = this.props.user.detail.id !== item.id
            return (
              <>
                {self && (
                  <Row mb="20px" align="center">
                    <Image source={{ uri: item.picture }} style={styles.img} />
                    <TouchableOpacity onPress={() => this.getChatView(item.id)}>
                      <Text bold mb="5px">
                        {item.fullName}
                      </Text>
                    </TouchableOpacity>
                  </Row>
                )}
              </>
            )
          }}
          onEndReached={this.nextContact}
          onEndReachedThreshold={0.5}
        />
      </Container>
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

const mapDispatchToProps = { userDetail, allUser, senderId, pagingContact }

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
