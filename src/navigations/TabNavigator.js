import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HomeScreen from '../screens/Home'
import ContactScreen from '../screens/Home/ContactScreen'
import CallsScreen from '../screens/Home/CallsScreen'
import { theme } from '../styles/ThemeColor'
import ProfileScreen from '../screens/Profile'
import HeaderHome from '../components/Header/HeaderHome'

const Tab = createBottomTabNavigator()

const AppNavigator = (props) => {
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
      <Tab.Screen name="Calls" component={CallsScreen} labelName="dawddwa" />
      <Tab.Screen name="Contacts" component={ContactScreen} />
      {/* Profile Screen */}
    </Tab.Navigator>
  )
}
export default AppNavigator
