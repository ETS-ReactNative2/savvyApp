import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import { theme } from '../../styles/ThemeColor'
import { HeaderWrapper } from './HeaderWrapper'
import { useNavigation } from '@react-navigation/native'
import { Text } from '../../styles/Typography'
import styled from 'styled-components'
import Logo from '../../assets/images/logos/skype-logo.png'
import { Row } from '../../styles/ComponentStyle'
import avatar from '../../assets/images/avatar2.jpg'

export const HeaderProfile = () => {
  const navigation = useNavigation()
  return (
    <HeaderWrapper>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconMaterial name="west" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text mr="10px">Sign out</Text>
      </TouchableOpacity>
    </HeaderWrapper>
  )
}

export const HeaderAuth = () => {
  return (
    <Container>
      <Image source={Logo} style={styles.img} />
    </Container>
  )
}

export const HeaderHome = () => {
  const navigation = useNavigation()
  return (
    <Container>
      <Row align="center" justify="space-between">
        <IconFeather name="bell" size={24} />
        <Row align="center">
          <TouchableOpacity
            onPress={() => navigation.navigate('profileScreen')}>
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>
          <IconFeather style={styles.icon} name="video" size={24} />
          <IconFeather style={styles.icon} name="search" size={24} />
          <IconFeather style={styles.icon} name="more-vertical" size={24} />
        </Row>
      </Row>
    </Container>
  )
}
const Container = styled.View`
  background-color: #fff;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.line};
`

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 80,
    resizeMode: 'contain',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  icon: {
    marginLeft: 20,
  },
})
