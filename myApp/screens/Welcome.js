import { StyleSheet, View } from 'react-native';
import { Content, Wrapper, Title, Logo } from '../components/layout';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Welcome({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('Login');
  }

  const goToRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <Wrapper backgroundColor={Colors.black}>
      <Content>
        <Logo type="white" style={styles.logo} />
        <Title color={Colors.white} 
              title="AudioMix" 
              customStyle={styles.title}
              />
        <Title
              title="Find your audio equipment, microphones, speakers and more" 
              color={Colors.white} 
              customStyle={styles.subtitle}
            />
        <Button 
          onPress={goToLogin} 
          label={"Sign Up"} 
          style={{ backgroundColor: 'white', marginBottom: 10 }}
          textStyle={{ color: 'black' }}
        />
        <Button 
          onPress={goToRegister} 
          label={"Login In"} 
          style={{ backgroundColor: 'white' }}
          textStyle={{ color: 'black' }}
        />
      </Content>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: -30,
    marginTop: 120,
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 45,
    paddingBottom: 50,
  },
  title: {
    fontFamily: Fonts.family.montserratBold,
    fontSize: 38,
    letterSpacing: 1,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: Fonts.family.montserratRegular,
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.5,
    opacity: 0.9,
    maxWidth: '85%',
  },
  logo: {
    marginBottom: 40,
    marginTop: 60,
  },
  button: {
    width: '80%',
    marginTop: 20,
  },
  secondButton: {
    marginTop: 15,
  }
});