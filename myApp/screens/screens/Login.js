import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import { Content, Header, Wrapper, Title, Logo } from "../components/layout";
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
        navigation.navigate('Panel');
      }
    });
    return subscriber;
  }, []);

  const openSocialMedia = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error al abrir la URL:', error);
    }
  };

  const login = async () => {
    if (!user || !pass) return; // Valida campos no vacíos
  
    setLoading(true);
    try {
      const loginSuccess = await loginWithEmailPass(user, pass);
      if (loginSuccess) {
        setUser("");
        setPass("");
        navigation.navigate('Panel');
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión"); // Otra vez pa que entienda vrg
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper backgroundColor={Colors.black}>
      <Content style = {styles.content}>
        <Title title="AudioMix" color={Colors.white} customStyle={styles.title} />
        <View style = {styles.headerContainer}>
          <Logo type = 'black' style = {styles.logo}/>
        </View> 

        <View style = {styles.formContainer}>
          <FormItem 
            value={user}
            label="Email" 
            keyboardType="email-address" 
            onChangeText={setUser} 
          />

          <FormItem 
            value={pass}
            secureTextEntry={true} 
            label="Password" 
            onChangeText={setPass} 
          />

          <View style={styles.buttonContainer}>
            <Button label="Sign In" onPress={login} isLoading={loading} type="white" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textLink}>Forgot Password?</Text>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={() => openSocialMedia('https://www.instagram.com/tu_cuenta')}>
              <Image source={require("../assets/instagram(32x32).png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openSocialMedia('https://www.facebook.com/tu_cuenta')}>
              <Image source={require("../assets/facebook(32x32).png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openSocialMedia('https://twitter.com/tu_cuenta')}>
              <Image source={require("../assets/xtwitter(32x32).png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textLink2}>New User? Register Now!</Text>
          </TouchableOpacity>
        </View>
        
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    paddingTop: 70,
    paddingBottom: 35,
    color: Colors.white,
    marginBottom: 15,
  },
  headerContainer: {
    paddingTop: 0,
    paddingBottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
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
});
