import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './src/navigations'

export class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return <AppNavigator />
  }
}

export default App
