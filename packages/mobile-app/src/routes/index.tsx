import { InitialState } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import { InitialStateContext } from '../context/InitialStates';
import { VerificationProvider } from '../context/Verification';
import { ConstituencyScreen } from '../screens/modals/Constituency';
import Introduction from '../screens/modals/Introduction';
import { PdfScreen } from '../screens/modals/Pdf/Pdf';
import { SidebarNavigation } from './Sidebar';
import Verification from './Verification';

export type RootStackParamList = {
  Sidebar: undefined;
  Home: {};
  Introduction: { done?: () => void; lastStartWithVersion?: string };
  Verification: {};
  Pdf: { url: string };
  Constituency: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [currentVersion, setCurrentVersion] = useState();
  const {
    lastStartWithVersion,
    setLastStartWithVersion,
    isVerified,
  } = useContext(InitialStateContext);

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
    <NavigationContainer initialState={initialState}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4494d3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
        }}>
        <RootStack.Screen
          name="Sidebar"
          component={SidebarNavigation}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Pdf" component={PdfScreen} />
        <RootStack.Screen
          name="Constituency"
          component={ConstituencyScreen}
          options={{
            title: 'Wahlkreissuche',
          }}
        />
        {!isVerified && (
          <RootStack.Screen
            name="Verification"
            options={{
              headerShown: false,
            }}
            component={() => (
              <VerificationProvider>
                <Verification />
              </VerificationProvider>
            )}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
