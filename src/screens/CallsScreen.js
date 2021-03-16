import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HeaderCalls from '../components/Header/HeaderCalls'

export class CallsScreen extends Component {
  render() {
    return (
      <View>
        <HeaderCalls />
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default CallsScreen
