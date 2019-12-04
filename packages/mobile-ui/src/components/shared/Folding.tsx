import React, { useState } from 'react';
import styled from 'styled-components/native';
import ArrowIcon from '../Icons/Arrow';
import { SvgProps } from 'react-native-svg';

const Wrapper = styled.View`
  margin-top: 11;
  background-color: #fff;
  border-radius: 5;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 9;
  padding-horizontal: 9;
`;

const Headline = styled.Text`
  flex: 1;
  font-size: 17;
`;

interface CollapseIconProps extends SvgProps {
  open: boolean;
}

const CollapseIcon = styled(ArrowIcon).attrs(() => ({
  color: 'rgb(151, 151, 151)',
  width: 20,
  height: 20,
}))<CollapseIconProps>`
  align-self: flex-start;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Divider = styled.View`
  height: 1;
  background-color: #efeff4;
  margin-top: 9;
`;

interface Props {
  title: string;
}

const Folding: React.FC<Props> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Header onPress={() => setOpen(!open)}>
        <Headline>{title}</Headline>
        <CollapseIcon open={open} />
      </Header>
      {open && (
        <>
          <Divider />
          {children}
        </>
      )}
      <Divider />
    </Wrapper>
  );
};

export default Folding;
