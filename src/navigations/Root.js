import React, { Component } from 'react'
import { chatBySender } from '../redux/actions/chat.action'
import io from '../helpers/socket'
import { connect } from 'react-redux'

class Root extends Component {
  chatBySender = async (token, sender) => {
    await this.props.chatBySender(token, sender)
  }
  async componentDidMount() {
    io.onAny(() => {
      io.once(sender, () => {
        this.props.chatBySender(token, sender)
      })
    })
  }
  render() {
    return <>{this.props.children}</>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  chat: state.chat,
})

const mapDispatchToProps = { chatBySender }

export default connect(mapStateToProps, mapDispatchToProps)(Root)
