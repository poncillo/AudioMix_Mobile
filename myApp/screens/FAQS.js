import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FAQS = ({ navigation }) => {
  // Estado para manejar qué categorías y preguntas están expandidas
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Datos de FAQs organizados por categorías
  const faqData = [
    {
      id: 1,
      category: "Productos y Servicios",
      questions: [
        {
          id: '1-1',
          question: "¿Qué tipos de equipos de audio ofrecen?",
          answer: "Ofrecemos una amplia gama de equipos de audio profesional incluyendo micrófonos, interfaces de audio, monitores de estudio, controladores MIDI, y más. Nuestro catálogo incluye marcas líderes en la industria."
        },
        {
          id: '1-2',
          question: "¿Ofrecen garantía en sus productos?",
          answer: "Sí, todos nuestros productos cuentan con garantía oficial del fabricante. El período de garantía varía según el producto y la marca, generalmente entre 1 y 3 años."
        }
      ]
    },
    {
      id: 2,
      category: "Envíos y Entregas",
      questions: [
        {
          id: '2-1',
          question: "¿Cuánto tiempo tarda el envío?",
          answer: "Los tiempos de envío varían según tu ubicación. Normalmente, los envíos locales tardan 2-3 días hábiles, mientras que los envíos nacionales pueden tomar 3-5 días hábiles."
        },
        {
          id: '2-2',
          question: "¿Realizan envíos internacionales?",
          answer: "Sí, realizamos envíos internacionales a través de servicios de mensajería confiables. Los tiempos de entrega y costos varían según el destino."
        }
      ]
    },
    {
      id: 3,
      category: "Pagos y Financiamiento",
      questions: [
        {
          id: '3-1',
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, transferencias bancarias y pagos en efectivo en nuestras tiendas físicas."
        },
        {
          id: '3-2',
          question: "¿Ofrecen opciones de financiamiento?",
          answer: "Sí, ofrecemos diferentes opciones de financiamiento a través de nuestros bancos asociados. También contamos con meses sin intereses en compras con tarjetas participantes."
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Technical Support')}> //Regresar a la pantalla anterior
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ'S</Text>
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

      {/* FAQs Content */}
      <ScrollView style={styles.content}>
        {faqData.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
            >
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <Icon 
                name={expandedCategory === category.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>

            {expandedCategory === category.id && (
              <View style={styles.questionsContainer}>
                {category.questions.map((item) => (
                  <View key={item.id} style={styles.questionItem}>
                    <TouchableOpacity 
                      style={styles.questionHeader}
                      onPress={() => setExpandedQuestion(
                        expandedQuestion === item.id ? null : item.id
                      )}
                    >
                      <Text style={styles.questionText}>{item.question}</Text>
                      <Icon 
                        name={expandedQuestion === item.id ? "remove" : "add"} 
                        size={20} 
                        color="white" 
                      />
                    </TouchableOpacity>

                    {expandedQuestion === item.id && (
                      <Text style={styles.answerText}>{item.answer}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
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
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionsContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  questionItem: {
    marginVertical: 5,
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  answerText: {
    color: '#CCC',
    fontSize: 14,
    padding: 15,
    paddingTop: 0,
    lineHeight: 20,
  },
});

export default FAQS; 