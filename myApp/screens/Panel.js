import { Content, Wrapper, Logo } from '../components/layout';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import DropdownMenu from '../components/controls/DropdownMenu';
import { useState } from 'react';
import Categories from '../navigation/External';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.8;

export default function Panel({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <Wrapper backgroundColor={Colors.black}>
      <Content style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Hey, Welcome to AudioMix Mobile</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon} onPress={() => setSearchVisible(!searchVisible)}>
                <Ionicons name="search" size={24} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('ShoppingCart')}>
                <EvilIcons name="cart" size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {searchVisible && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={Colors.gray}
              value={searchText}
              onChangeText={setSearchText}
            />
          )}

          <View style={styles.logoSection}>
            <Logo type="white" width={150} />
          </View>

          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
            <Image source={require('../assets/ev_zlx_1.jpg')} style={styles.carouselImage} resizeMode="contain" />
            <Image source={require('../assets/ev_zlx_2.jpg')} style={styles.carouselImage} resizeMode="contain" />
          </ScrollView>

          <Text style={styles.carouselText}>You know the new line of EV ZLX? Try it now!</Text>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Categories')}>
            <Ionicons name="grid-outline" size={24} color={Colors.white} />
            <Text style={styles.navText}>Categories</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} color={Colors.white} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu-outline" size={24} color={Colors.white} />
            <Text style={styles.navText}>Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Menús Modales */}
        <DropdownMenu 
          visible={menuVisible} 
          onClose={() => setMenuVisible(false)}
          navigation={navigation}
        />
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  carouselImage: {
    width: CAROUSEL_WIDTH,
    height: 180,
    marginHorizontal: width * 0.1,
    resizeMode: 'contain',
  },
  carouselText: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    marginTop: 20,
  },
  welcomeText: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratBold,
    fontSize: 16,
    maxWidth: '60%',
    textAlign: 'left',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'flex-end',
  },
  icon: {
    padding: 5,
    alignItems: 'right',
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  bottomNav: {
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.white,
    backgroundColor: Colors.black,
    position: 'absolute',
    bottom: -90,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratRegular,
    fontSize: 12,
    marginTop: 5,
  },
  searchInput: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
