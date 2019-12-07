import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
import Verification from './Verification';
import { InitialStateContext } from '../context/InitialStates';
import { VerificationProvider } from '../context/Verification';
import DeviceInfo from 'react-native-device-info';
import { InitialState } from '@react-navigation/core';
import { SidebarNavigation } from './Sidebar';
import { useEffect } from 'react';

export type RootStackParamList = {
  Sidebar: undefined;
  Home: {};
  Introduction: { done?: () => void; lastStartWithVersion?: string };
  Verification: {};
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [currentVersion, setCurrentVersion] = useState();
  const { lastStartWithVersion, setLastStartWithVersion } = useContext(
    InitialStateContext,
  );

  useEffect(() => {
    setCurrentVersion(DeviceInfo.getVersion());
  }, []);

  if (lastStartWithVersion === undefined || currentVersion === undefined) {
    return null;
  }

  const initialState: InitialState = {
    routes: [
      {
        name: 'Sidebar',
      },
    ],
  };
  if (currentVersion !== lastStartWithVersion) {
    initialState.routes.push({
      name: 'Introduction',
      params: {
        done: () => setLastStartWithVersion(currentVersion),
        lastStartWithVersion,
      },
    });
  }

  return (
    <NavigationNativeContainer initialState={initialState}>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Sidebar" component={SidebarNavigation} />
        <RootStack.Screen name="Introduction" component={Introduction} />
        <RootStack.Screen
          name="Verification"
          component={() => (
            <VerificationProvider>
              <Verification />
            </VerificationProvider>
          )}
        />
      </RootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
