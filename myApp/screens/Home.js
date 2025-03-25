import { useState, useEffect } from "react";
import { FlatList, ScrollView, Alert, StyleSheet, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { Content, Header, Wrapper } from "../components/layout";
import State from "../components/controls/State";
import Button from "../components/controls/Button";
import StateModal from "../components/modals/StateModal";
import { auth, db } from "../firebase-config";
import { logoutAuth } from "../services/firebase";

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({
    key: "",
    name: "",
    code: "",
    status: false,
  });
  
  const [data, setData] = useState([]);
  useEffect(() => {
    const subscriber = onSnapshot(
      query(collection(db, "states"), orderBy("name")),
      (querySnapshot) => {
        const states = [];
        querySnapshot.forEach((doc) => {
          states.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setData(states);
      }
    );
    return subscriber;
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (response) => {
      if (!response) {
        navigation.navigate("Login");
      }
    });
    return subscriber;
  }, [auth]);

  const logout = async () => {
    await logoutAuth();
  };

  const createNew = () => {
    setSelected({
      key: "",
      name: "",
      code: "",
      status: false,
    });
    toggleModal();
  };

  const editState = item => {
    setSelected(item);
    toggleModal();
  };

  const deleteState = async key => {
    try {
      // Creamos primero la referencia al documento que vamos a eliminar
      const stateRef = doc(db, "states", key);
      // Eliminamos nuestro documento
      await deleteDoc(stateRef);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Wrapper style={styles.container}>
      <Header title="" showCart={false} style={styles.header} />
      <StateModal
        selected={selected}
        setSelected={setSelected}
        visible={visible}
        onClose={toggleModal}
      />
      <Content style={styles.content}>
        <Button label="Cerrar sesión" onPress={logout} textStyle={styles.buttonText} />
        <Button label="Crear nuevo" onPress={createNew} textStyle={styles.buttonText} />
        <ScrollView horizontal={true} style={{ width: '100%' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <State item={item} onEdit={editState} onDelete={deleteState} />
            )}
            keyExtractor={(item) => item.key}
          />
        </ScrollView>
      </Content>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  header: {
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonText: {
    color: "white", 
  },
});