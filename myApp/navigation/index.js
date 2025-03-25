import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import Dashboard from './Dashboard';
import External from './External';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="External">
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="External" component={External} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}