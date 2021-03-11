import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HomeScreen from '../screens/Home'
import ContactScreen from '../screens/Home/ContactScreen'
import CallsScreen from '../screens/Home/CallsScreen'
import { theme } from '../styles/ThemeColor'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: `${theme.primary}`,
      }}>
      <Tab.Screen
        name="home"
        component={CallsScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="calls-screen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Calls',
          tabBarIcon: ({ color, size }) => (
            <Icon name="call" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile-screen"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="contacts" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
export default TabNavigator
