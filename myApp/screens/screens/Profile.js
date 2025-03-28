import React, { useState, useEffect } from "react";
import { Alert, View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, app, storage } from "../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Content, Header, Wrapper } from "../components/layout";
import Colors from "../constants/Colors";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    country: "",
    address: "",
    profile_picture: null,
  });
  const auth = getAuth(app);

  useEffect(() => {
    const subscriber = onSnapshot(
      doc(db, "users", auth.currentUser?.uid || ""),
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setData((prev) => ({
            ...prev,
            full_name: userData.full_name,
            age: userData.age,
            phone: userData.phone,
            country: userData.country,
            address: userData.address,
            profile_picture: userData.profile_picture,
            email: userData.email,
          }));
        }
      }
    );
    return subscriber;
  }, [auth]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images, // Updated to use ImagePicker.MediaType
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      const source = result.assets[0].uri;
      await uploadImage(source);
    } else {
      Alert.alert("Error", "No image selected.");
    }
  };

  const uploadImage = async (uri) => {
    if (!auth.currentUser || !uri) {
      Alert.alert("Error", "Invalid image URI.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const imageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { profile_picture: downloadURL },
        { merge: true }
      );

      setData((prev) => ({ ...prev, profile_picture: downloadURL }));
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        const updatedData = {
          full_name: data.full_name || "",
          phone: data.phone || "",
          age: data.age || "",
          country: data.country || "",
          address: data.address || "",
        };

        await setDoc(doc(db, "users", auth.currentUser.uid), updatedData, { merge: true });
        Alert.alert("Succes", "Profile update successfully.");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Can't update profile.");
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Panel')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERFIL</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
    <Wrapper style={styles.container} backgroundColor={Colors.black}>
      <Content>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imageContainer}>
            {data.profile_picture ? (
              <Image source={{ uri: data.profile_picture }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.whiteText}>Choose a Photo</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <FormItem
          value={data.full_name}
          label="Full Name"
          onChangeText={(value) => setData((prev) => ({ ...prev, full_name: value }))} 
          textColor={"white"}
        />
        <FormItem value={data.email} label="Email" editable={false} textColor={"white"} />
        <FormItem value="******" label="Password" editable={false} textColor={"white"} />
        <FormItem
          value={data.phone}
          label="Phone"
          keyboardType="phone-pad"
          onChangeText={(value) => setData((prev) => ({ ...prev, phone: value.trim() }))} 
          textColor={"white"}
        />
        <FormItem
          value={data.age}
          label="Age"
          keyboardType="number-pad"
          onChangeText={(value) => setData((prev) => ({ ...prev, age: value.trim() }))} 
          textColor={"white"}
        />
        <FormItem
          value={data.country}
          label="Country"
          onChangeText={(value) => setData((prev) => ({ ...prev, country: value }))} 
          textColor={"white"}
        />
        <FormItem
          value={data.address}
          label="Adress"
          onChangeText={(value) => setData((prev) => ({ ...prev, address: value }))} 
          textColor={"white"}
        />

        <Button
          onPress={updateUser}
          label={"SUBMIT UPDATE"}
          isLoading={loading}
          style={styles.whiteButton}
          textStyle={styles.blackText}
          backgroundColor={Colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    color: "white",
  },
  whiteButton: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  blackText: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;