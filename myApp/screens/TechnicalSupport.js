import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TechnicalSupport = ({ navigation }) => {
  const supportOptions = [
    { id: 1, title: "FAQ'S" },
    { id: 2, title: 'PRODUCT REGISTRATION' },
    { id: 3, title: 'CUSTOMER SUPPORT' },
    { id: 4, title: 'PRE - SALES' },
    { id: 5, title: 'WARRANTY & TERMS & CONDITIONS' },
    { id: 6, title: 'WEBSITE FEEDBACK' },
    /*{ id: 7, title: 'CONTACT US' }, */
  ];

  return ( 
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AUDIOMIX MOBILE</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/AudioMixlogo-01.png')}
          style={styles.logo}
        />
      </View>

      {/* Title with icons */}
      <View style={styles.titleContainer}>
        <Icon name="settings" size={30} color="white" />
        <Text style={styles.title}>Technical Support</Text>
      </View>

      {/* Support Options */}
      <ScrollView style={styles.optionsContainer}>
        {supportOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={() => {
              if (option.title === "FAQ'S") {
                navigation.navigate('FAQS');
              } else if (option.title === 'PRODUCT REGISTRATION') {
                navigation.navigate('ProductRegistration');
              } else if (option.title === 'CUSTOMER SUPPORT') {
                navigation.navigate('CustomerSupport');
              } else if (option.title === 'PRE - SALES') {
                navigation.navigate('PreSales');
              } else if (option.title === 'WARRANTY & TERMS & CONDITIONS') {
                navigation.navigate('WarrantyAndTerms');
              } else if (option.title === 'WEBSITE FEEDBACK') {
                navigation.navigate('WebsiteFeedback');
              }  else {
                console.log(`Navegando a ${option.title}`);
              }
            }}
          >
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="message" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="people" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginLeft: 10,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default TechnicalSupport; 