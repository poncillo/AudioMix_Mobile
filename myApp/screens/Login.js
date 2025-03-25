import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { Content, Header, Wrapper, Title } from "../components/layout";
import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";
import { auth } from "../firebase-config";
import { loginWithEmailPass } from "../services/firebase";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (response) => {
      if (response) {
        navigation.navigate("Dashboard");
      }
    });
    return subscriber;
  }, []);

  const openSocialMedia = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error al abrir la URL:", error);
    }
  };

  const login = async () => {
    if (user && pass) {
      setLoading(true);
      await loginWithEmailPass(user, pass);
      setUser("");
      setPass("");
      setLoading(false);
    }
  };

  return (
    <Wrapper backgroundColor={Colors.black}>
      <Header showBack={true} showCart={false} />
      <Content>
        <Title title="AudioMix" color={Colors.white} customStyle={styles.title} />

        <FormItem 
          value={user}
          label="Email" 
          keyboardType="email-address" 
          onChangeText={setUser}
          textColor={Colors.white} // Texto en blanco
        />

        <FormItem 
          value={pass}
          secureTextEntry={true} 
          label="Password" 
          onChangeText={setPass} 
          textColor={Colors.white} // Texto en blanco
        />

        <View style={styles.buttonContainer}>
          <Button 
            label="Sign In" 
            onPress={login} 
            isLoading={loading} 
            style={{ backgroundColor: 'white', marginBottom: 10 }} // Color de fondo blanco y margen inferior
            textStyle={{ color: 'black' }} // Asegúrate de que el texto sea negro
          />
          <Button 
            label="Register" 
            onPress={() => navigation.navigate("Register")} 
            style={{ backgroundColor: 'white' }} // Color de fondo blanco
            textStyle={{ color: 'black' }} // Asegúrate de que el texto sea negro
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textLink}>Forgot Password?</Text>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => openSocialMedia("https://www.instagram.com/tu_cuenta")}>
            <Image source={require("../assets/instagram(32x32).png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia("https://www.facebook.com/tu_cuenta")}>
            <Image source={require("../assets/facebook(32x32).png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia("https://twitter.com/tu_cuenta")}>
            <Image source={require("../assets/xtwitter(32x32).png")} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.textLink2}>New User? Register Now!</Text>
        </TouchableOpacity>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    justifyContent: "center", // Centra los botones
  },
  textContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  textLink: {
    color: "#0066CC",
    fontSize: 16,
    fontFamily: Fonts.family.montserratRegular,
    textDecorationLine: "underline",
  },
  textLink2: {
    color: "#0066CC",
    marginVertical: 30,
    fontSize: 16,
    fontFamily: Fonts.family.montserratRegular,
    textDecorationLine: "underline",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    gap: 20,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  whiteButton: {
    backgroundColor: Colors.white, // Fondo blanco
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  blackText: {
    color: Colors.black, // Texto negro
    fontWeight: "bold",
    fontSize: 16,
  },
});

