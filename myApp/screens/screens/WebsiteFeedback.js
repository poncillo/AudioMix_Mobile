import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WebsiteFeedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState({
    category: '',
    rating: 0,
    title: '',
    description: '',
    email: '',
  });

  const categories = [
    'User Interface',
    'Performance',
    'Features', 
    'Content',
    'Bug Report',
    'Other',
  ];

  const handleSubmit = () => {
    if (!feedback.category || !feedback.title || !feedback.description) {
      Alert.alert(
        'Missing Information',
        'Please fill in all required fields before submitting.'
      );
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully. We appreciate your input to help improve our service.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedback({
              category: '',
              rating: 0,
              title: '',
              description: '',
              email: '',
            });
            navigation.navigate('Technical Support');
          },
        },
      ]
    );
  };

  const RatingStars = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setFeedback({ ...feedback, rating: star })}
          >
            <Icon
              name={star <= feedback.rating ? 'star' : 'star-border'}
              size={30}
              color={star <= feedback.rating ? '#FFD700' : '#666'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Technical Support')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WEBSITE FEEDBACK</Text>
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

      <ScrollView style={styles.content}>
        {/* Introduction Text */}
        <Text style={styles.introText}>
          Help us improve your experience! Share your thoughts and suggestions about our website and services.
        </Text>

        {/* Category Selection */}
        <Text style={styles.sectionTitle}>Feedback Category *</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                feedback.category === category && styles.categoryButtonActive,
              ]}
              onPress={() => setFeedback({ ...feedback, category })}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  feedback.category === category && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rating */}
        <Text style={styles.sectionTitle}>Overall Rating</Text>
        <RatingStars />

        {/* Feedback Title */}
        <Text style={styles.sectionTitle}>Feedback Title *</Text>
        <TextInput
          style={styles.input}
          value={feedback.title}
          onChangeText={(text) => setFeedback({ ...feedback, title: text })}
          placeholder="Brief summary of your feedback"
          placeholderTextColor="#666"
        />

        {/* Feedback Description */}
        <Text style={styles.sectionTitle}>Detailed Feedback *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={feedback.description}
          onChangeText={(text) => setFeedback({ ...feedback, description: text })}
          placeholder="Please provide detailed feedback to help us understand your experience better"
          placeholderTextColor="#666"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Email (Optional) */}
        <Text style={styles.sectionTitle}>Email (Optional)</Text>
        <TextInput
          style={styles.input}
          value={feedback.email}
          onChangeText={(text) => setFeedback({ ...feedback, email: text })}
          placeholder="Enter your email if you'd like us to follow up"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>

        {/* Required Fields Note */}
        <Text style={styles.requiredNote}>* Required fields</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  introText: {
    color: '#CCC',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#CCC',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredNote: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WebsiteFeedback;