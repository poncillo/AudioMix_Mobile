import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { useEffect, useRef } from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { logoutAuth } from '../../services/firebase';

export default function DropdownMenu({ visible, onClose, navigation }) {

  const menuItems = [
    { id: 1, title: 'Home', action: () => navigation.navigate('Panel') },
    { id: 2, title: 'Technical Support', action: () => { console.log('Navigating to Technical Support'); navigation.navigate('TechnicalSupport');} },
    { id: 3, title: 'Log Out', action: handleLogout },
  ];

  async function handleLogout() {
    try {
      await logoutAuth();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      Alert.alert("Error", "Can't entry to the session: " + error.message);
    }
  }

  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -200,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onClose}>
      <Animated.View style={[styles.menu, { transform: [{ translateY: slideAnim }] }]}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => { onClose(); item.action(); }}>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
    },
    menu: {
      position: 'absolute',
      bottom: 90,
      left: 0,
      right: 0,
      backgroundColor: Colors.black,
      borderTopWidth: 1,
      borderTopColor: Colors.white,
      paddingVertical: 10,
    },
    menuItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.white,
    },
    menuText: {
      color: Colors.white,
      fontFamily: Fonts.family.montserratRegular,
      fontSize: 16,
    }
  });