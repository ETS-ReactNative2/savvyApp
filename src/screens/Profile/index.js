import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Row } from '../../styles/ComponentStyle'
import { theme } from '../../styles/ThemeColor'
import avatar from '../../assets/images/avatar.png'
import { Text } from '../../styles/Typography'
import HeaderProfile from '../../components/Header/HeaderProfile'

export const WrapperManage = (props) => {
  return (
    <TouchableOpacity {...props}>
      <WrapperForm>
        <Row align="center">
          <WrapperIcon>
            <IconFeather style={styles.icon} name={props.leftIcon} size={18} />
          </WrapperIcon>
          <Text>{props.title}</Text>
        </Row>
      </WrapperForm>
    </TouchableOpacity>
  )
}

export const WrapperManageCol = (props) => {
  return (
    <WrapperForm>
      <Row align="center">
        <WrapperIcon>
          <IconMaterial style={styles.icon} name={props.leftIcon} size={18} />
        </WrapperIcon>
        <View>
          <Text>{props.title}</Text>
          <Text size="12px" label>
            {props.desc}
          </Text>
        </View>
      </Row>
    </WrapperForm>
  )
}

export const WrapperProfile = (props) => {
  return (
    <Wrapper>
      <Row align="center" justify="space-between">
        <Row align="center">
          <WrapperIcon>
            <IconAwesome
              style={styles.icon}
              color={props.color}
              name={props.leftIcon}
              size={18}
            />
          </WrapperIcon>
          {props.children}
        </Row>
        <IconFeather style={styles.icon} name={props.rightIcon} size={18} />
      </Row>
    </Wrapper>
  )
}

export class ProfileScreen extends Component {
  render() {
    return (
      <>
        <HeaderProfile navigation={this.props.navigation} />
        <Layout>
          <Container>
            <Row mt="10px" mb="20px">
              <Image source={avatar} style={styles.img} />
              <View>
                <Text bold size="16px">
                  Shafa Naura
                </Text>
                <Text size="12px">shafanaura48@gmail.com</Text>
                <Text size="12px" mt="10px" primary>
                  My Microsoft account
                </Text>
              </View>
            </Row>
            <WrapperProfile
              leftIcon="circle"
              color="#00d95e"
              rightIcon="chevron-down">
              <Text>Active</Text>
            </WrapperProfile>
            <WrapperProfile leftIcon="bullhorn" rightIcon="edit-2">
              <TextInput placeholder="Share what you're up to" />
            </WrapperProfile>
            <WrapperManage leftIcon="bookmark" title="Bookmarks" />
          </Container>
          <WrapperSpace>
            <Text p="5px 10px" size="12px" bold label>
              MANAGE
            </Text>
          </WrapperSpace>
          <Container>
            <WrapperManage
              leftIcon="user"
              title="Skype Profile"
              onPress={() => this.props.navigation.navigate('manage-profile')}
            />
            <WrapperManageCol
              leftIcon="phone"
              title="Skype to Phone"
              desc="Call phones at affordable rates"
            />
            <WrapperManageCol
              leftIcon="dialpad"
              title="Skype Number"
              desc="Get a second number"
            />
            <WrapperManage leftIcon="settings" title="Settings" />
          </Container>
        </Layout>
      </>
    )
  }
}
const Wrapper = styled.View`
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  padding-bottom: 5px;
`
const WrapperSpace = styled.View`
  background-color: #e8e8e8;
`
const WrapperForm = styled.View`
  padding-bottom: 10px;
  border-bottom-color: ${theme.line};
  border-bottom-width: 1px;
  margin-top: 10px;
`
const WrapperIcon = styled.View`
  margin-right: 10px;
`
const Container = styled.View`
  background-color: #fff;
  padding: 0 10px;
`
const Layout = styled.View`
  flex: 1;
  background: white;
`

const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: 20,
  },
  icon: {
    padding: 10,
  },
})

export default ProfileScreen
