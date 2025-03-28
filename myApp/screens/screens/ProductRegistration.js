import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState({
    productType: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    storeName: '',
    receiptNumber: '',
    name: '',
    email: '',
    phone: ''
  });

  const [showProductTypes, setShowProductTypes] = useState(false);

  const productTypes = [
    "Seleccionar tipo de producto",
    "Micrófonos",
    "Interfaces de Audio",
    "Monitores de Estudio",
    "Controladores MIDI",
    "Mezcladores",
    "Procesadores de Señal",
    "Amplificadores"
  ];

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los datos
    console.log('Datos del formulario:', formData);
    // Mostrar mensaje de éxito y regresar
    alert('Producto registrado exitosamente');
    navigation.navigate('Technical Support');
  };

  const FormInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Technical Support')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REGISTRO DE PRODUCTO</Text>
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

      {/* Form */}
      <ScrollView style={styles.formContainer}>
        {/* Product Type Selector */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de Producto</Text>
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowProductTypes(true)}
          >
            <Text style={[styles.inputText, !formData.productType && styles.placeholder]}>
              {formData.productType || "Seleccionar tipo de producto"}
            </Text>
          </TouchableOpacity>
        </View>

        <FormInput
          label="Modelo"
          value={formData.model}
          onChangeText={(text) => setFormData({ ...formData, model: text })}
          placeholder="Ingrese el modelo del producto"
        />

        <FormInput
          label="Número de Serie"
          value={formData.serialNumber}
          onChangeText={(text) => setFormData({ ...formData, serialNumber: text })}
          placeholder="Ingrese el número de serie"
        />

        <FormInput
          label="Fecha de Compra"
          value={formData.purchaseDate}
          onChangeText={(text) => setFormData({ ...formData, purchaseDate: text })}
          placeholder="DD/MM/AAAA"
        />

        <FormInput
          label="Tienda de Compra"
          value={formData.storeName}
          onChangeText={(text) => setFormData({ ...formData, storeName: text })}
          placeholder="Nombre de la tienda"
        />

        <FormInput
          label="Número de Factura"
          value={formData.receiptNumber}
          onChangeText={(text) => setFormData({ ...formData, receiptNumber: text })}
          placeholder="Número de factura o recibo"
        />

        <Text style={styles.sectionTitle}>Información de Contacto</Text>

        <FormInput
          label="Nombre Completo"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Su nombre completo"
        />

        <FormInput
          label="Correo Electrónico"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
        />

        <FormInput
          label="Teléfono"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Su número de teléfono"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Registrar Producto</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Product Type Modal */}
      <Modal
        visible={showProductTypes}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Tipo de Producto</Text>
              <TouchableOpacity onPress={() => setShowProductTypes(false)}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {productTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => {
                    setFormData({ ...formData, productType: type });
                    setShowProductTypes(false);
                  }}
                >
                  <Text style={styles.optionText}>{type}</Text>
                </TouchableOpacity>
              ))}
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
  formContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
  inputText: {
    color: 'white',
    fontSize: 16,
  },
  placeholder: {
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
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
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProductRegistration; 