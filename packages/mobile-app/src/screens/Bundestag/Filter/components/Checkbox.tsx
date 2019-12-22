import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

// TODO improve type
const Wrapper = styled.View<{
  value: boolean | 'mixed';
  color?: string;
  disabledColor?: string;
}>`
  width: 24;
  height: 24;
  border-radius: 12;
  background-color: ${({ value, color, disabledColor }) =>
    value ? color : disabledColor};
  border-width: 1;
  border-color: rgba(74, 74, 74, 0.2);
`;

const Checkmark = styled.View.attrs<{
  value: boolean | 'mixed';
  disabledColor?: string;
}>(({ value, disabledColor }) => ({
  color: value ? '#fff' : disabledColor,
  size: 40,
  backgroundColor: 'transparent',
  name: 'ios-checkmark',
}))<{ value: boolean | 'mixed'; disabledColor?: string }>`
  margin-top: 2;
  margin-left: 4;
`;

interface Props {
  value: boolean | 'mixed';
  color?: string;
  disabledColor?: string;
  disabledCheckmarkColor?: string;
}

const white = '#fff';

const Checkbox: React.FC<Props> = ({
  value,
  color = '#4494d3',
  disabledColor = '#fff',
  disabledCheckmarkColor = '#fff',
}) => (
  <Wrapper color={color} disabledColor={disabledColor} value={value}>
    <Checkmark value={value} disabledColor={disabledCheckmarkColor}>
      {value && <Text style={{ color: white }}>✓</Text>}
    </Checkmark>
  </Wrapper>
);

export default Checkbox;
