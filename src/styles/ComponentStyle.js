import styled from 'styled-components'

export const Container = styled.View`
  padding: ${(props) => props.p || '20px'};
  background-color: ${(props) => props.bg || 'white'};
`
export const Row = styled.View`
  flex-direction: row;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  flex-wrap: wrap;
  margin: ${(props) => props.m || '0'};
  margin-top: ${(props) => props.mt || '0'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-left: ${(props) => props.ml || '0'};
`
