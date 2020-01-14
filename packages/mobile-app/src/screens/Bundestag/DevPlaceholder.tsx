import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Button, Platform, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { TopTabParamList } from '../../routes/Sidebar/Bundestag/TabView';
import { InitialStateContext } from '../../context/InitialStates';
import VotesLocal from '../../lib/VotesLocal';
import NotificationsIOS, {
  NotificationsAndroid,
} from 'react-native-notifications';
import DeviceInfo from 'react-native-device-info';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabParamList, 'DEV'>,
  CompositeNavigationProp<
    StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
    CompositeNavigationProp<
      DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
      StackNavigationProp<RootStackParamList>
    >
  >
>;

const NotificationWrapper = styled.View`
  background-color: lightblue;
`;

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const NotificationDev = () => {
  const [appState] = useState(AppState.currentState);

  const registered = false;
  const onPushRegistered = async (deviceToken: string) => {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log(deviceToken);
  };

  const onPushRegistrationFailed = (error: any) => {
    console.error(error);
  };

  const handleNotificationPressWithDelay = delay => async () => {
    const params = [this.userId, delay];
    await fetch(
      `http://192.168.178.12:7777/test-send/${params.filter(p => p).join('/')}`,
    )
      .then(res => console.log({ res }))
      .catch(error => console.log({ error }));
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.match(/inactive|background/) &&
      nextAppState === 'active' &&
      registered
    ) {
      addNotificationsEventListeners();
      if (isIOS) {
        const notification = await PushNotificationIOS.getInitialNotification();
        if (notification) {
          this.onNotificationReceivedBackground(notification);
        }
      }
      if (isAndroid) {
        const notification = await PendingNotifications.getInitialNotification();
        if (notification) {
          this.onAndroidNotificationReceived(notification);
        }
      }
    }
    this.setState({ appState: nextAppState });
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (isIOS && !DeviceInfo.isEmulatorSync()) {
      NotificationsIOS.requestPermissions();
      NotificationsIOS.addEventListener(
        'remoteNotificationsRegistered',
        onPushRegistered,
      );
      NotificationsIOS.addEventListener(
        'remoteNotificationsRegistrationFailed',
        onPushRegistrationFailed,
      );
    }
    /* Android */
    if (isAndroid) {
      NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered);
    }
    return () => {
      if (isIOS) {
        NotificationsIOS.removeEventListener(
          'remoteNotificationsRegistered',
          onPushRegistered,
        );
        NotificationsIOS.removeEventListener(
          'remoteNotificationsRegistrationFailed',
          onPushRegistrationFailed,
        );
        NotificationsIOS.removeEventListener(
          'notificationReceivedForeground',
          onNotificationReceivedForeground,
        );
        NotificationsIOS.removeEventListener(
          'notificationOpened',
          onNotificationOpened,
        );
      }
    };
  }, [handleAppStateChange]);

  return (
    <NotificationWrapper>
      <Button
        title="Notification in 10 seconds"
        onPress={() => console.log('Notification in 10 seconds')}
      />
      <Button
        title="Notification now"
        onPress={() => console.log('Notification now')}
      />
    </NotificationWrapper>
  );
};

export const DevPlaceholder: FC = () => {
  const { isVerified } = useContext(InitialStateContext);
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  return (
    <Container>
      <Text>Bundestag Screen</Text>
      <Button
        title="Go to Procedure"
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId: '1',
            title: 'Sitzungswoche',
          })
        }
      />
      <Button title="Voting" onPress={() => navigation.navigate('Voting')} />
      <Button
        title="Go to Introduction"
        onPress={() => navigation.navigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => navigation.navigate('Verification')}
      />
      {__DEV__ && <Text>is verified {JSON.stringify(isVerified)}</Text>}
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Button
        title="Clear Local Votes Storage"
        onPress={() => VotesLocal.reset()}
      />
      <Document width="32px" height="32px" color="black" />
      <NotificationDev />
    </Container>
  );
};
