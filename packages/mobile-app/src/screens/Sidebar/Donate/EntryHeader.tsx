import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  height: 30;
  background-color: #efeff4;
  justify-content: center;
  padding-horizontal: 18;
  shadow-color: #c8c7cc;
`;

const Title = styled.Text`
  font-size: 13;
`;

interface Props {
  title: string;
  style?: any; // StyleProp<ViewStyle>;
}

export const EntryHeader: React.FC<Props> = ({ title, style = {} }) => (
  <Wrapper style={style}>
    <Title>{title}</Title>
  </Wrapper>
);
