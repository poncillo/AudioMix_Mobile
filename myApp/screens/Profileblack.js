import { useState, useEffect } from "react";
import { Alert, View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // <-- Importar funciones de Storage
import { db, app, storage } from "../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";
import { Content, Header, Wrapper } from "../components/layout";

const Profile = () => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}.jpg`);
  
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, blob).then(async (snapshot) => {
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        setData((prev) => ({ ...prev, profile_picture: downloadURL }));
      });
    }
  };
  
  const updateUser = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, "users", auth.currentUser.uid), data, {
          merge: true,
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", JSON.stringify(error));
      }
    }
    setLoading(false);
  };

  return (
    <Wrapper style={styles.container}>
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
          label="Nombre completo"
          onChange={(value) => setData((prev) => ({ ...prev, full_name: value }))}
          textColor={"white"}
        />
        <FormItem value={data.email} label="Email" editable={false} textColor={"white"} />
        <FormItem value="******" label="Password" editable={false} textColor={"white"} />
        <FormItem
          value={data.phone}
          label="Teléfono"
          keyboardType="phone-pad"
          onChange={(value) => setData((prev) => ({ ...prev, phone: value }))}
          textColor={"white"}
        />
        <FormItem
          value={data.age}
          label="Edad"
          keyboardType="number-pad"
          onChange={(value) => setData((prev) => ({ ...prev, age: value }))}
          textColor={"white"}
        />
        <FormItem
          value={data.country}
          label="País"
          onChange={(value) => setData((prev) => ({ ...prev, country: value }))}
          textColor={"white"}
        />
        <FormItem
          value={data.address}
          label="Dirección"
          onChange={(value) => setData((prev) => ({ ...prev, address: value }))}
          textColor={"white"}
        />

        <Button
          onPress={updateUser}
          label={"ACTUALIZAR"}
          isLoading={loading}
          style={styles.whiteButton}
          textStyle={styles.blackText}
        />
      </Content>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      flex: 1,
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
      backgroundColor: "white",
      borderRadius: 5,
      paddingVertical: 12,
      alignItems: "center",
    },
    blackText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

export default Profile;