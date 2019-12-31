import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import styled from 'styled-components/native';
import WahlOMeter from '../../../screens/WahlOMeter';
import { Procedure } from '../../../screens/Bundestag';

export type WahlOMeterStackParamList = {
  WahlOMeter: undefined;
  Procedure: { procedureId: string; title: string };
};

const WahlOMeterStack = createStackNavigator<WahlOMeterStackParamList>();

type WahlOMeterNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'WahlOMeter'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const WahlOMeterNavigation = () => {
  const navigation = useNavigation<WahlOMeterNavigationProps>();
  return (
    <WahlOMeterStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4494d3',
        },
        headerTintColor: '#fff',
      }}>
      <WahlOMeterStack.Screen
        name="WahlOMeter"
        component={WahlOMeter}
        options={{
          title: 'WahlOMeter',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
          },
          headerLeft: () => (
            <MenuButton onPress={navigation.toggleDrawer}>
              <MenuIcon width={18} height={18} color="#fff" />
            </MenuButton>
          ),
        }}
      />
      <WahlOMeterStack.Screen
        name="Procedure"
        component={Procedure}
        options={({ route }) => ({ title: route.params.title })}
      />
    </WahlOMeterStack.Navigator>
  );
};

export default WahlOMeterNavigation;
