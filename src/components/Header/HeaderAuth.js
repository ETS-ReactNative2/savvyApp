import React from 'react'
import { StyleSheet, Image } from 'react-native'
import styled from 'styled-components'
import Logo from '../../assets/images/logos/skype-logo.png'
import { Row } from '../../styles/ComponentStyle'

export const HeaderAuth = () => {
  return (
    <ContainerAuth>
      <Row align="center" justify="center">
        <Image source={Logo} style={styles.img} />
      </Row>
    </ContainerAuth>
  )
}

const ContainerAuth = styled.View`
  background-color: #fff;
  padding: 10px;
`

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 80,
    resizeMode: 'contain',
  },
})
