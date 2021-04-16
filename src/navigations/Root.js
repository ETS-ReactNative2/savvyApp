import React, { Component } from 'react'
import { chatBySender, chatView } from '../redux/actions/chat.action'
import { userDetail } from '../redux/actions/user.action'
import io from '../helpers/socket'
import { connect } from 'react-redux'
import { showMessage } from '../helpers/showMessage'

class Root extends Component {
  getChat = async (token, sender) => {
    await this.props.chatBySender(token, sender)
    await this.props.chatView(token)
  }
  componentDidMount() {
    io.onAny(() => {
      const { token } = this.props.auth
      const { sender } = this.props.chat
      const { id } = this.props.user.detail
      io.once(id, () => {
        this.getChat(token, sender)
      })
    })
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
})

const mapDispatchToProps = { chatBySender, chatView, userDetail }

export default connect(mapStateToProps, mapDispatchToProps)(Root)
