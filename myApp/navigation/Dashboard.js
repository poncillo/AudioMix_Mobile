import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import TechnicalSupport from '../screens/TechnicalSupport';
import FAQS from '../screens/FAQS';
import ProductRegistration from '../screens/ProductRegistration';
import CustomerSupport from '../screens/CustomerSupport';
import PreSales from '../screens/PreSales';
import WarrantyAndTerms from '../screens/WarrantyAndTerms';
import WebsiteFeedback from '../screens/WebsiteFeedback';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
export default function Dashboard() {
  return (
    <Drawer.Navigator 
      initialRouteName='Home'
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
        },
        drawerLabelStyle: {
          color: '#fff',
        },
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{ 
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Ionicons name="home" size={size} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{ 
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Ionicons name="person" size={size} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name='TechnicalSupport'
        component={TechnicalSupport}
        options={{ 
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Ionicons name="settings" size={size} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name='FAQS'
        component={FAQS}
        options={{ 
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name='ProductRegistration'
        component={ProductRegistration}
        options={{ 
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name="CustomerSupport"
        component={CustomerSupport}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name="PreSales"
        component={PreSales}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name="WarrantyAndTerms"
        component={WarrantyAndTerms}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
      <Drawer.Screen
        name="WebsiteFeedback"
        component={WebsiteFeedback}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
          gestureEnabled: false
        }}
      />
    </Drawer.Navigator>
  );
}