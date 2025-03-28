import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WarrantyAndTerms = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState('warranty');

  const warrantyContent = {
    title: 'Política de Garantía',
    sections: [
      {
        title: 'Cobertura de la Garantía',
        content: 'AudioMix garantiza que sus productos estarán libres de defectos en materiales y mano de obra durante un período de dos (2) años a partir de la fecha de compra original. Esta garantía se aplica solo al comprador original y no es transferible.'
      },
      {
        title: 'Exclusiones',
        content: 'La garantía no cubre daños causados por:\n• Accidentes o uso indebido\n• Modificaciones no autorizadas\n• Desgaste normal\n• Daños por agua o elementos\n• Reparaciones realizadas por personal no autorizado'
      },
      {
        title: 'Proceso de Garantía',
        content: '1. Registre su producto en nuestra plataforma\n2. Contacte a nuestro servicio técnico\n3. Proporcione prueba de compra\n4. Siga las instrucciones de envío proporcionadas'
      },
      {
        title: 'Período de Reparación',
        content: 'Las reparaciones bajo garantía se completarán en un plazo de 15 días hábiles desde la recepción del producto.'
      }
    ]
  };

  const termsContent = {
    title: 'Términos y Condiciones',
    sections: [
      {
        title: 'Uso del Servicio',
        content: 'Al utilizar nuestros servicios y productos, usted acepta cumplir con estos términos y condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento.'
      },
      {
        title: 'Registro de Cuenta',
        content: 'Para acceder a ciertos servicios, deberá crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.'
      },
      {
        title: 'Propiedad Intelectual',
        content: 'Todos los derechos de propiedad intelectual relacionados con nuestros productos y servicios son propiedad de AudioMix. No se permite la reproducción sin autorización.'
      },
      {
        title: 'Política de Privacidad',
        content: 'Recopilamos y procesamos datos personales de acuerdo con nuestra política de privacidad. Al usar nuestros servicios, acepta nuestras prácticas de procesamiento de datos.'
      },
      {
        title: 'Limitación de Responsabilidad',
        content: 'AudioMix no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso de nuestros productos o servicios.'
      }
    ]
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Technical Support')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GARANTÍA Y TÉRMINOS</Text>
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

      {/* Section Selector */}
      <View style={styles.sectionSelector}>
        <TouchableOpacity
          style={[
            styles.selectorButton,
            selectedSection === 'warranty' && styles.selectorButtonActive,
          ]}
          onPress={() => setSelectedSection('warranty')}
        >
          <Text
            style={[
              styles.selectorButtonText,
              selectedSection === 'warranty' && styles.selectorButtonTextActive,
            ]}
          >
            Garantía
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectorButton,
            selectedSection === 'terms' && styles.selectorButtonActive,
          ]}
          onPress={() => setSelectedSection('terms')}
        >
          <Text
            style={[
              styles.selectorButtonText,
              selectedSection === 'terms' && styles.selectorButtonTextActive,
            ]}
          >
            Términos y Condiciones
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.mainTitle}>
          {selectedSection === 'warranty'
            ? warrantyContent.title
            : termsContent.title}
        </Text>
        {(selectedSection === 'warranty' ? warrantyContent.sections : termsContent.sections).map(
          (section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          )
        )}
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
  sectionSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#007AFF',
  },
  selectorButtonText: {
    color: '#CCC',
    fontSize: 14,
  },
  selectorButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WarrantyAndTerms;