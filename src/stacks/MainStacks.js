import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import Barber from '../screens/Barber';
import Edit from '../screens/Edit';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="Preload"
      component={Preload}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="MainTab"
      component={MainTab}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Barber"
      component={Barber}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Edit" component={Edit} options={{headerShown: false}} />
  </Stack.Navigator>
);
