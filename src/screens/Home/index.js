import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import avatar from '../../assets/images/avatar.png'
import { Text } from '../../styles/Typography'
import styled from 'styled-components'
import { theme } from '../../styles/ThemeColor'
import { Row } from '../../styles/ComponentStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HeaderHome from '../../components/Header/HeaderHome'

export class HomeScreen extends Component {
  render() {
    return (
      <>
        <HeaderHome navigation={this.props.navigation} />
        <Container>
          <Row mb="10px">
            <Image source={avatar} style={styles.img} />
            <RowChat>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('chat-screen')}>
                <View>
                  <Text size="20px" mb="3px">
                    Audi
                  </Text>
                  <Text>Maybe Next time...</Text>
                </View>
              </TouchableOpacity>
              <TextDate>2/26/2021</TextDate>
            </RowChat>
          </Row>
        </Container>
      </>
    )
  }
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 10px;
`
const TextDate = styled.Text`
  text-align: right;
  flex: 1;
  font-size: 12px;
  color: ${theme.label};
`
const RowChat = styled.View`
  flex-direction: row;
  margin-left: 10px;
  flex: 1;
  padding-bottom: 15px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
`

const styles = StyleSheet.create({
  img: {
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  icon: {
    paddingLeft: 20,
  },
})

export default HomeScreen
