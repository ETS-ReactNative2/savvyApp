import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ChatTab, CallsTab, ContactTab } from './RootTab'

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
      <Tab.Screen name="Home" component={ChatTab} />
      <Tab.Screen name="Calls" component={CallsTab} />
      <Tab.Screen name="Contacts" component={ContactTab} />
    </Tab.Navigator>
  )
}
export default TabNavigator
