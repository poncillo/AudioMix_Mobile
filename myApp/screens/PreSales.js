import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Modal,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const products = [
  {
    id: '1',
    name: 'Micrófono XM-200',
    description: 'Micrófono profesional de condensador con patrón polar cardioide',
    features: [
      'Respuesta de frecuencia: 20Hz - 20kHz',
      'Sensibilidad: -36dB',
      'Impedancia: 200Ω',
      'Conexión XLR balanceada'
    ],
    price: '$299.99'
  },
  {
    id: '2',
    name: 'Interfaz de Audio AI-400',
    description: 'Interfaz de audio USB de alta resolución con 4 entradas y 4 salidas',
    features: [
      'Resolución: hasta 24-bit/192kHz',
      '4 preamplificadores de micrófono',
      'Monitoreo de latencia cero',
      'Compatible con Windows y Mac'
    ],
    price: '$499.99'
  },
  {
    id: '3',
    name: 'Monitor de Estudio SM-5',
    description: 'Monitor de estudio activo de 5 pulgadas para mezcla profesional',
    features: [
      'Potencia: 70W',
      'Respuesta de frecuencia: 45Hz - 22kHz',
      'Woofer de 5" y tweeter de 1"',
      'Controles de EQ de alta y baja frecuencia'
    ],
    price: '$399.99'
  }
];

const PreSales = ({ navigation }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInquiry = () => {
    // Aquí iría la lógica para enviar la consulta
    console.log('Nueva consulta:', { ...inquiry, product: selectedProduct?.name });
    setShowInquiryModal(false);
    setInquiry({ name: '', email: '', phone: '', message: '' });
    alert('Consulta enviada exitosamente');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TechnicalSupport')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRE-SALES</Text>
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

      {/* Products List */}
      <ScrollView style={styles.productsList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.featuresList}>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon name="check-circle" size={16} color="#007AFF" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <View style={styles.productFooter}>
              <Text style={styles.productPrice}>{product.price}</Text>
              <TouchableOpacity
                style={styles.inquiryButton}
                onPress={() => {
                  setSelectedProduct(product);
                  setShowInquiryModal(true);
                }}
              >
                <Text style={styles.inquiryButtonText}>Consultar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Inquiry Modal */}
      <Modal visible={showInquiryModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Consulta sobre {selectedProduct?.name}
              </Text>
              <TouchableOpacity onPress={() => setShowInquiryModal(false)}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={inquiry.name}
                  onChangeText={(text) => setInquiry({ ...inquiry, name: text })}
                  placeholder="Tu nombre completo"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={inquiry.email}
                  onChangeText={(text) => setInquiry({ ...inquiry, email: text })}
                  placeholder="tu@email.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  value={inquiry.phone}
                  onChangeText={(text) => setInquiry({ ...inquiry, phone: text })}
                  placeholder="Tu número de teléfono"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mensaje</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={inquiry.message}
                  onChangeText={(text) => setInquiry({ ...inquiry, message: text })}
                  placeholder="Escribe tu consulta aquí"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleInquiry}
              >
                <Text style={styles.submitButtonText}>Enviar Consulta</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 16,
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
  productsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  productName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 12,
  },
  featuresList: {
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureText: {
    color: '#CCC',
    fontSize: 14,
    marginLeft: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inquiryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  inquiryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalForm: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreSales;