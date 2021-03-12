import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import EnterPassword from '../screens/Login/EnterPassword'
import EnterEmail from '../screens/Register/EnterEmail'
import CreatePassword from '../screens/Register/CreatePassword'
import EnterName from '../screens/Register/EnterName'
import TabNavigator from './TabNavigator'
import ProfileScreen from '../screens/Profile'
import {
  HeaderProfile,
  HeaderHome,
  HeaderAuth,
  HeaderManageProfile,
} from '../components/Header'
import { Text } from '../styles/Typography'
import ManageProfile from '../screens/Profile/ManageProfile'

const Stack = createStackNavigator()

export class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* Login screen */}
          {/* <Stack.Screen
            name="login"
            component={Login}
            options={{
              header: () => <HeaderAuth />,
            }}
          />
          <Stack.Screen
            name="enter-password"
            component={EnterPassword}
            options={{
              header: () => <HeaderAuth />,
            }}
          /> */}
          {/* Register Screen */}
          {/* <Stack.Screen
            name="register"
            component={Register}
            options={{
              header: () => <HeaderAuth />,
            }}
          />
          <Stack.Screen
            name="enter-email"
            component={EnterEmail}
            options={{
              header: () => <HeaderAuth />,
            }}
          />
          <Stack.Screen
            name="create-password"
            component={CreatePassword}
            options={{
              header: () => <HeaderAuth />,
            }}
          />
          <Stack.Screen
            name="enter-name"
            component={EnterName}
            options={{
              header: () => <HeaderAuth />,
            }}
          /> */}
          {/* Home Screen */}
          {/* <Stack.Screen
            name="tab-navigator"
            component={TabNavigator}
            options={{
              header: () => <HeaderHome />,
            }}
          /> */}
          {/* Profile Screen */}
          {/* <Stack.Screen
            name="profileScreen"
            component={ProfileScreen}
            options={{
              header: () => <HeaderProfile />,
            }}
          /> */}
          <Stack.Screen
            name="manage-profile"
            component={ManageProfile}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default AppNavigator
