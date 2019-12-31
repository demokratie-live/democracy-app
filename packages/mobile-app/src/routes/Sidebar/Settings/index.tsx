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
import { Settings } from '../../../screens/Settings';

export type SettingsRootStackParamList = {
  Settings: undefined;
};

const SettingsRootStack = createStackNavigator<SettingsRootStackParamList>();

type SettingsNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Settings'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const SettingsRootNavigation = () => {
  const navigation = useNavigation<SettingsNavigationProps>();
  return (
    <SettingsRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4494d3',
        },
        headerTintColor: '#fff',
      }}>
      <SettingsRootStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
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
    </SettingsRootStack.Navigator>
  );
};

export default SettingsRootNavigation;
