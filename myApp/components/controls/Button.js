import { TouchableOpacity, Text, StyleSheet, ActivityIndicator} from "react-native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({ label, type = "black", onPress, isLoading = false,}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        type === "white" && styles.containerWhite,
        isLoading && styles.disableButton,
      ]}
      disabled={isLoading}
    >
      {isLoading && (
        <ActivityIndicator style={styles.activity} color={Colors.white} />
      )}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    paddingVertical: 12,
    width: '100%',
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.family.montserratBold,
    fontSize: Fonts.size.normal,
  },
  containerWhite: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: 15,
    borderWidth: 2,
  },
  textWhite: {
    color: Colors.black,
  }
});