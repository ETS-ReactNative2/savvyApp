import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import styled from 'styled-components'
import Logo from '../../assets/images/logos/skype-logo.png'

const HeaderAuth = () => {
  return (
    <Container>
      <Image source={Logo} style={styles.img} />
    </Container>
  )
}

const Container = styled.View`
  padding: 20px;
  align-items: center;
  background-color: #fff;
`
const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 80,
    resizeMode: 'contain',
  },
})

export default HeaderAuth
