import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HomeScreen from '../screens/ChatsScreen'
import ContactsScreen from '../screens/ContactsScreen'
import CallsScreen from '../screens/CallsScreen'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      {/* Profile Screen */}
    </Tab.Navigator>
  )
}
export default AppNavigator
