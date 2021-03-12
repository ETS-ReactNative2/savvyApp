import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components'
import { Container, Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import avatar from '../assets/images/avatar.png'
import { Text } from '../styles/Typography'

const IconButton = (props) => {
  return (
    <TouchableOpacity>
      <LinearGradient
        style={{ borderRadius: 25 }}
        colors={['#0279D5', '#02BBF3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Icon
          name={props.icon}
          size={props.size}
          color="white"
          style={{ padding: props.padding }}
        />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export class Chat extends Component {
  render() {
    return (
      <Container p="0">
        <ScrollView>
          <Container p="10px">
            <Row>
              <Image source={avatar} style={styles.avatar} />
              <View>
                <View>
                  <Text size="12px" label>
                    Audi
                  </Text>
                  <LinearGradient
                    style={styles.wrapSend}
                    colors={['#0279D5', '#02BBF3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text white p="10px" semibold>
                      Halo
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </Row>
            <Row justify="flex-end">
              <View>
                <View style={styles.wrapGet}>
                  <Text>Halo Juga</Text>
                </View>
                <View style={styles.wrapGet}>
                  <Text>Pa kabs?</Text>
                </View>
              </View>
            </Row>
          </Container>
        </ScrollView>
        <RowFooter>
          <IconButton icon="plus" size={25} padding={5} />
          <TextInput placeholder="Type a message" />
          <IconButton icon="send" size={20} padding={10} />
        </RowFooter>
      </Container>
    )
  }
}

const TextInput = styled.TextInput`
  border-radius: 25px;
  flex: 1;
  padding-horizontal: 20px;
  background-color: ${theme.inputbg};
  font-family: 'OpenSans-Regular';
  margin-horizontal: 5px;
`
const RowFooter = styled.View`
  background-color: white;
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  wrapSend: {
    marginTop: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  wrapGet: {
    backgroundColor: theme.inputbg,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    padding: 10,
    marginTop: 3,
  },
})

export default Chat
