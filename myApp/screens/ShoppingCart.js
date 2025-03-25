import { Content, Header, Wrapper, Logo, Title } from '../components/layout';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import DropdownMenu from '../components/controls/DropdownMenu';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ShoppingCart({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Wrapper backgroundColor={Colors.black}>
      <Content style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>AudioMix Mobile</Text>
          
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Shopping Cart</Text>
          <Text style={styles.subtitle}>Here's your articles in your cart, do you wanna pay?</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Cart items would go here */}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.couponButton}>
            <Text style={styles.buttonText}>Apply Coupon</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.continueButton}>
            <Text style={[styles.buttonText, { color: Colors.black }]}>Continue</Text>
          </TouchableOpacity>
        </View>

        <DropdownMenu 
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  searchButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  bottomButtons: {
    padding: 20,
    gap: 10,
  },
  couponButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.family.montserratBold,
    fontSize: 16,
    color: Colors.white,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  mainTitle: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratBold,
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratRegular,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratBold,
    fontSize: 18,
  },
});