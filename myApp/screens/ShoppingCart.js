import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const ShoppingCart = ({ route, navigation }) => {
  const { cart = [] } = route.params || {};
  const [couponApplied, setCouponApplied] = useState(false);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    calculateTotal();
    checkCoupon();
  }, [cart]);

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(subtotal);
  };

  const checkCoupon = async () => {
    try {
      const couponDoc = await getDoc(doc(db, 'cuppon', 'false'));
      if (couponDoc.exists()) {
        const couponData = couponDoc.data();
        if (couponData && !couponApplied) {
          const discountAmount = (total * couponData.number) / 100;
          setDiscount(discountAmount);
          setCouponApplied(true);
        }
      }
    } catch (error) {
      console.error('Error checking coupon:', error);
    }
  };

  const handleContinue = async () => {
    try {
      const orderData = {
        items: cart,
        total: total - discount,
        couponApplied,
        discount,
        userorder: "Don Fermin",
        date: new Date(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('Panel');
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SHOPPING CART</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.content}>
        {cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image
              source={{ uri: `../assets/products/${item.name.toLowerCase().replace(/\s+/g, '')}.jpg` }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        {couponApplied && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Discount:</Text>
            <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalValue}>${(total - discount).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 4,
  },
  summary: {
    backgroundColor: '#222',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    color: '#888',
    fontSize: 16,
  },
  summaryValue: {
    color: 'white',
    fontSize: 16,
  },
  discountValue: {
    color: '#4CAF50',
    fontSize: 16,
  },
  totalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShoppingCart;