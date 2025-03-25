import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { SplashScreen } from "./components/layout"; // Se mantiene la pantalla de carga

import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import {
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
  );
}