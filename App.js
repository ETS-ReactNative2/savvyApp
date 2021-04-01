import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './src/navigations'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistedStore from './src/redux/store'
import FlashMessage from 'react-native-flash-message'
import { ModalPortal } from 'react-native-modals'
import { MenuProvider } from 'react-native-popup-menu'

const { store, persistor } = persistedStore()

export class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <MenuProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigator />
            <FlashMessage position="top" />
            <ModalPortal />
          </PersistGate>
        </Provider>
      </MenuProvider>
    )
  }
}

export default App
