import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const FormItem = ({label, placeholder, value, onChangeText, secureTextEntry, textColor = Colors.white}) => {
  return(
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <TextInput 
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={textColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    paddingTop: 15,
  },
  label: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.montserratMedium,
    textAlign: 'center',
  },
  input: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 2,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.montserratRegular,
    paddingBottom: 8,
    paddingTop: 5,
    textAlign: 'center',
  }
});

export default FormItem;