import { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Content, Wrapper, Title, Logo } from "../components/layout";
import FormItem from "../components/controls/FormItem";
import Button from "../components/controls/Button";
import { registerEmailPass } from "../services/firebase";
import Colors from "../constants/Colors";

export default function Register({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    full_name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const registerUser = async () => {
    if (user.email && user.password) {
      setLoading(true);
      const result = await registerEmailPass(user);
      if (result) {
        setUser({
          email: "",
          full_name: "",
          password: "",
        });
        setLoading(false);
        navigation.navigate("Login");
      } else {
        setLoading(false);
      }
    }
  };

  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 20,
      width: "100%",
      alignItems: "center", // Asegura que los botones estén centrados
    },
    button: {
      marginVertical: 15, // Aumentamos el espacio entre los botones
      width: "80%", // Opcional: para que no ocupen todo el ancho
    },
  });

  return (
    <Wrapper>
      <Content>
        <Logo />
        <Title title="Registrar nueva cuenta" color={Colors.black} customStyle={{ fontSize: 30 }} />
        <FormItem
          value={user.email}
          label="Correo electrónico"
          keyboardType="email-address"
          onChangeText={(value) => setUser((prev) => ({ ...prev, email: value.trim() }))}
          textColor = {Colors.black}
        />
        <FormItem
          value={user.full_name}
          label="Nombre completo"
          onChangeText={(value) => setUser((prev) => ({ ...prev, full_name: value }))}
          textColor = {Colors.black}
        />
        <FormItem
          secure={true}
          label="Contraseña"
          value={user.password}
          onChangeText={(value) => setUser((prev) => ({ ...prev, password: value.trim() }))}
          textColor = {Colors.black}
        />
        <View style={styles.buttonContainer}>
          <Button 
            onPress={registerUser} 
            label={"REGISTRARME"} 
            isLoading={loading} 
            style={styles.button}
          />
          <Button 
            onPress={goToLogin} 
            label={"INICIAR SESIÓN"} 
            style={styles.button}
          />
        </View>
      </Content>
    </Wrapper>
  );
}