import { useState } from "react";
import { View, StyleSheet, Alert } from 'react-native';
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

  return (
    <Wrapper style={styles.container} backgroundColor={Colors.white}>
      <Content>
        <Logo style={styles.logo} />
        <Title title="Registrar nueva cuenta" color={Colors.black} customStyle={{ fontSize: 30 }} />
        <FormItem
          value={user.email}
          label="Email"
          keyboardType="email-address"
          onChangeText={(value) => setUser((prev) => ({ ...prev, email: value.trim() }))}
          textColor={Colors.black}
          style={{ borderColor: Colors.black }}
        />
        <FormItem
          value={user.full_name}
          label="Full Name"
          onChangeText={(value) => setUser((prev) => ({ ...prev, full_name: value }))}
          textColor={Colors.black}
          style={{ borderColor: Colors.black }}
        />
        <FormItem
          secure={true}
          label="Password"
          value={user.password}
          onChangeText={(value) => setUser((prev) => ({ ...prev, password: value.trim() }))}
          textColor={Colors.black}
          style={{ borderColor: Colors.black }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper} >
            <Button 
              onPress={registerUser} backgroundColor={Colors.white}
              label={"REGISTER"} 
              isLoading={loading} 
              style={styles.button}
            />
          </View>
          <View style={styles.buttonWrapper} backgroundColor={Colors.white} >
            <Button 
              onPress={goToLogin} 
              label={"LOGIN"} 
              style={styles.button}
            />
          </View>
        </View>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  buttonWrapper: {
    marginBottom: 5,
    width: "100%",
  },
  button: {
    width: "80%",
  },
  logo: {
    marginBottom: 40,
    marginTop: 30,
  },
});