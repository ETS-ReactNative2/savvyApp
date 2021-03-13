import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './src/navigations'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistedStore from './src/redux/store'
import FlashMessage from 'react-native-flash-message'

const { store, persistor } = persistedStore()

export class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
