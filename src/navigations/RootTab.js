import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatsScreen from '../screens/ChatsScreen'
import CallsScreen from '../screens/CallsScreen'
import ContactsScreen from '../screens/ContactsScreen'
import HeaderChats from '../components/Header/HeaderChats'
import HeaderCalls from '../components/Header/HeaderCalls'
import HeaderContacts from '../components/Header/HeaderContacts'

const Stack = createStackNavigator()

export const ChatTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat-Screen"
        component={ChatsScreen}
        options={{
          header: (props) => <HeaderChats {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export const CallsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          header: (props) => <HeaderCalls {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export const ContactTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          header: (props) => <HeaderContacts {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}
