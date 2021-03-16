import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ChatsScreen from '../screens/ChatsScreen'
import ContactsScreen from '../screens/ContactsScreen'
import CallsScreen from '../screens/CallsScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'chat',
            Calls: 'call',
            Contacts: 'contacts',
          }
          return <Icon name={icons[route.name]} color={color} size={size} />
        },
      })}>
      <Tab.Screen name="Home" component={ChatsScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  )
}
export default TabNavigator
