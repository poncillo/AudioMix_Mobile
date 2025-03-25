import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export function Title({ title, color, customStyle }) {
  return (
    <View style={styles.container}>
      <Text style={[
        styles.text, 
        { color: color || Colors.black },
        customStyle
      ]}>
        {title}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    fontFamily: Fonts.family.josefinBold,
    fontSize: 39,
    textAlign: 'center',
  }
});