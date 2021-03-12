import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign'
import styled from 'styled-components'
import { Container, Row } from '../../styles/ComponentStyle'
import LinearGradient from 'react-native-linear-gradient'
import avatar from '../../assets/images/avatar.png'
import { Text } from '../../styles/Typography'
import { theme } from '../../styles/ThemeColor'

export const WrapperManage = (props) => {
  return (
    <TouchableOpacity>
      <Wrapper>
        <Row align="center" justify="space-between">
          <Row align="center">
            {props.children}
            <Text ml="10px" bold>
              {props.title}
            </Text>
          </Row>
          <TextInputProfile
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
          />
        </Row>
      </Wrapper>
    </TouchableOpacity>
  )
}

export class ManageProfile extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#0279D5', '#02BBF3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <ScrollView style={{}}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity>
              <IconMaterial name="west" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <Row justify="center">
            <Image source={avatar} style={styles.img} />
          </Row>
          <Container p="10px" style={{ marginTop: -20 }}>
            <Row align="center" justify="center" mt="10px">
              <TextInputName
                placeholder="Your Name"
                defaultValue="Shafa Naura"
              />
              <IconFeather name="edit-2" size={25} color={theme.placeholder} />
            </Row>
            <WrapperManage title="Share profile">
              <IconFeather name="share-2" size={25} />
            </WrapperManage>
            {/* Profile */}
            <Text mt="20px" bold label size="12px">
              PROFILE
            </Text>
            <WrapperManage
              title="Skype Name"
              defaultValue="live:cid:6484894fawf48">
              <IconAnt name="contacts" size={25} />
            </WrapperManage>
            <WrapperManage
              title="Email"
              placeholder="Enter your e-mail"
              defaultValue="shafanaura48@gmail.com">
              <IconFeather name="mail" size={25} />
            </WrapperManage>
            <WrapperManage title="Birthday" placeholder="Add birthday">
              <IconFeather name="gift" size={25} />
            </WrapperManage>
            {/* Other */}
            <Text mt="20px" bold label size="12px">
              OTHER
            </Text>
            <WrapperManage title="Other ways people can find you">
              <IconFeather name="users" size={25} />
            </WrapperManage>
            <WrapperManage title="Help & Feedback">
              <IconFeather name="alert-circle" size={25} />
            </WrapperManage>
          </Container>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const Image = styled.Image`
  z-index: 1;
`
const TextInputName = styled.TextInput`
  font-family: 'OpenSans-Bold';
  font-size: 24px;
`
const TextInputProfile = styled.TextInput`
  font-family: 'OpenSans-Regular';
  color: ${theme.placeholder};
`
const Wrapper = styled.View`
  padding-bottom: 5px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  margin-top: 20px;
`
const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: 40,
  },
})
export default ManageProfile
