import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Categories = ({ navigation }) => {
  const categories = [
    {
      id: 1,
      name: 'Mixers',
      image: require('../assets/ev_zlx_1.jpg'), // Necesitarás agregar las imágenes correctas
    },
    {
      id: 2,
      name: 'Microphones',
      image: require('../assets/ev_zlx_1.jpg'), // Necesitarás agregar las imágenes correctas
    },
    {
      id: 3,
      name: 'Speakers',
      image: require('../assets/ev_zlx_1.jpg'), // Necesitarás agregar las imágenes correctas
    },
    {
      id: 4,
      name: 'Lights',
      image: require('../assets/ev_zlx_1.jpg'), // Necesitarás agregar las imágenes correctas
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Panel')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CATEGORIES</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/AudioMixlogo-01.png')}
          style={styles.logo}
        />
      </View>

      {/* Categories Grid */}
      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => {
                // Aquí puedes agregar la navegación a la lista de productos de cada categoría
                console.log(`Selected category: ${category.name}`);
              }}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  categoryName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
});

export default Categories;