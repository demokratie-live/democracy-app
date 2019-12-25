import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { VerificationStart } from '../../screens/modals/Verification/Start';
import { PhoneNumber } from '../../screens/modals/Verification/PhoneNumber';
import { Code } from '../../screens/modals/Verification/Code';
import { RootStackParamList } from '..';
import { useNavigation } from '@react-navigation/core';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

export type VerificationRootStackParamList = {
  Start: undefined;
  PhoneNumberInput: undefined;
  SmsCodeInput: undefined;
};

const VerificationRootStack = createStackNavigator<
  VerificationRootStackParamList
>();

type VerificationNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Verification'
>;

const VerificationRootNavigation = () => {
  const navigation = useNavigation<VerificationNavigationProps>();
  return (
    <VerificationRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4494d3',
        },
        headerTintColor: '#fff',
      }}>
      <VerificationRootStack.Screen
        name="Start"
        component={VerificationStart}
        options={{
          headerTitle: 'VERIFIZIEREN',
          headerLeft: () => {
            return (
              <Button
                onPress={navigation.goBack}
                text="Später"
                textColor="white"
              />
            );
          },
        }}
      />
      <VerificationRootStack.Screen
        name="PhoneNumberInput"
        component={PhoneNumber}
        options={{
          headerTitle: 'VERIFIZIEREN',
          headerBackTitle: 'Zurück',
        }}
      />
      <VerificationRootStack.Screen
        name="SmsCodeInput"
        component={Code}
        options={{
          headerTitle: 'VERIFIZIEREN',
          headerBackTitle: 'Zurück',
        }}
      />
    </VerificationRootStack.Navigator>
  );
};

export default VerificationRootNavigation;
