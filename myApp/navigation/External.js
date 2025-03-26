import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import Panel from '../screens/Panel';
import Profile from '../screens/Profile';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

export default function External() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='Welcome'component={Welcome} options={{ headerShown: false }}/>
      <Stack.Screen name='Login' component={Login}options={{ headerShown: false }}/>
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name='Panel' component={Panel} options={{ headerShown: false }}/>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }}/>
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          headerShown: false,
          animation: 'none'
        }}
      />
    </Stack.Navigator>
  )
}