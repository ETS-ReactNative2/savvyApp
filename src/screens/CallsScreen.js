import React from 'react'
import { View, FlatList, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Container, Row } from '../styles/ComponentStyle'
import { theme } from '../styles/ThemeColor'
import { Text } from '../styles/Typography'
import { listContact } from '../utils/listContact'

const CallsScreen = () => {
  return (
    <Container p="10px">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listContact}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Row mb="20px" align="center">
              <Image source={{ uri: item.picture }} style={styles.img} />
              <View style={styles.border}>
                <Row align="center" justify="space-between">
                  <View>
                    <Text bold>{item.name}</Text>
                    <Row align="center" mb="5px">
                      <Icon
                        name={
                          item.type === 'out'
                            ? 'phone-outgoing'
                            : 'phone-incoming'
                        }
                        color="#A0A3BD"
                        size={14}
                      />
                      <Text label ml="5px">
                        {item.createdAt}
                      </Text>
                    </Row>
                  </View>
                  <Row>
                    <Icon name="video" size={24} style={{ marginRight: 20 }} />
                    <Icon name="phone" size={24} />
                  </Row>
                </Row>
              </View>
            </Row>
          )
        }}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  icon: {
    paddingLeft: 20,
  },
  border: {
    marginLeft: 10,
    flex: 1,
    borderBottomColor: theme.line,
    borderBottomWidth: 1,
  },
})

export default CallsScreen
