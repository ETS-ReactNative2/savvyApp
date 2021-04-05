import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './src/navigations'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistedStore from './src/redux/store'
import FlashMessage from 'react-native-flash-message'
import { ModalPortal } from 'react-native-modals'
import { MenuProvider } from 'react-native-popup-menu'
import Root from './src/navigations/Root'
import { NavigationContainer } from '@react-navigation/native'

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
            <NavigationContainer>
              <Root>
                <AppNavigator />
                <FlashMessage position="top" duration={3000} />
                <ModalPortal />
              </Root>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </MenuProvider>
    )
  }
}

export default App
