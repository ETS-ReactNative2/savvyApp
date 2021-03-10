import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../styles/ThemeColor'
import { Text } from '../styles/Typography'

class FormInput extends Component {
  state = {
    borderColor: `${theme.label}`,
  }
  onFocus() {
    this.setState({
      borderColor: `${theme.primary}`,
    })
  }

  onBlur() {
    this.setState({
      borderColor: `${theme.label}`,
    })
  }
  render() {
    return (
      <TextInput
        {...this.props}
        onBlur={() => this.onBlur()}
        onFocus={() => this.onFocus()}
        style={{
          borderColor: this.state.borderColor,
          color: this.state.color,
        }}
      />
    )
  }
}

const TextInput = styled.TextInput`
  border-bottom-width: 1.3px;
  padding-bottom: 5px;
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
`

export default FormInput
