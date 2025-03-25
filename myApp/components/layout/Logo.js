import { View, Image, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export function Logo({
  type = 'black',
  width,
  style
}) {
  const image = type === 'black' 
    ? require('../../assets/AudioMixlogo-01.jpg') 
    : require('../../assets/AudioMixlogo(Invert).png');
  const size = width || windowWidth * 0.6;

  return (
    <View style={[styles.container, style]}>
      <Image
        style={{
          height: size,
          width: size,
        }}
        source={image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});