import React from 'react';
import styled from 'styled-components/native';

enum BackgroundColors {
  transparent = 'transparent',
  blue = '#4494d3',
  lightBlue = '#9AC5E7',
  red = '#ec3e31',
}
interface ContainerProps {
  color: keyof typeof BackgroundColors;
  disabled?: boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({ color, disabled }) =>
    disabled ? '#979797' : BackgroundColors[color]};
  height: 60;
  justify-content: center;
  border-radius: 2;
  margin-top: 11;
`;

enum TextColors {
  blue = '#0076ff',
  white = '#fff',
  red = '#d0021b',
}

interface TextProps {
  color: keyof typeof TextColors;
}
const ButtonText = styled.Text<TextProps>`
  text-align: center;
  color: ${({ color }) => TextColors[color]};
  font-size: 20;
  line-height: 24;
`;

export interface Props {
  text: string;
  onPress: () => void;
  textColor: keyof typeof TextColors;
  backgroundColor?: keyof typeof BackgroundColors;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  text,
  onPress,
  textColor,
  backgroundColor = 'transparent',
  disabled,
}) => (
  <Container
    disabled={disabled}
    testID="Button"
    onPress={onPress}
    color={backgroundColor}>
    <ButtonText testID="ButtonText" color={textColor}>
      {text}
    </ButtonText>
  </Container>
);
