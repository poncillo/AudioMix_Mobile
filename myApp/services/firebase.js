//Autenticación y pantalla de login
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

import { auth, db } from '../firebase-config';

/**
 * Cierra sesión del usuario
 */
export const logoutAuth = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    Alert.alert("Error", "No se pudo cerrar sesión.");
  }
};

/**
 * Inicia sesión solo si el usuario está en Firestore
 */
export const loginWithEmailPass = async (email, password) => {
  try {
    // Autenticar usuario en Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Consultar Firestore para verificar si el usuario está registrado en "users"
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      Alert.alert("Error", "Usuario no registrado en la base de datos.");
      return false;
    }

    return true; // Usuario válido
  } catch (error) {
    Alert.alert("Error", "Correo o contraseña incorrectos.");
    return false;
  }
};

/**
 * Registra un usuario nuevo en Firebase Authentication y Firestore
 */
export const registerEmailPass = async (user) => {
  try {
    // Validación adicional
    if (!user.email || !user.password || !user.full_name) {
      Alert.alert("Error", "Todos los campos son requeridos");
      return false;
    }

    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const uid = userCredential.user.uid;

    // Guardar información en Firestore
    await setDoc(doc(db, 'users', uid), {
      full_name: user.full_name,
      email: user.email,
      created_at: new Date().toISOString()
    });

    Alert.alert("Éxito", "Usuario registrado correctamente.");
    return true;

  } catch (error) {
    console.error('Error en registerEmailPass:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert("Error", "Este correo ya está registrado. Intenta con otro.");
    } else if (error.code === 'auth/weak-password') {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
    } else if (error.code === 'auth/invalid-email') {
      Alert.alert("Error", "El correo electrónico no es válido.");
    } else {
      Alert.alert("Error", "Hubo un problema con el registro: " + error.message);
    }
    return false;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

/*
CODIGO ANTIGUO
import {signInWithEmailAndPassword } from "firebase/auth"; //Servicio para autenticar credenciales, lo va a validar atraves de el servicio (firebase-config.js)
import {Alert} from 'react-native';
import {auth} from './firebase-config';

//definir parámetros para crear una función de iniciar sesión

import {EmailAuthCredential, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {Alert} from 'react-native';
import {auth} from './firebase-config';

//definir parámetros para crear una función de iniciar sesión
{
    String;
}
email;
{
    String;
}
password;

export const loginWithEmailPass = async(email,password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        Alert.alert("Error", error.message);
    }
}

//Ahora cerrar sesión
export const logAuth = async() =>{
    try{
        await auth.signOut();
    }catch(error){
        Alert.alert("Error", error.message);
    }
}
*/