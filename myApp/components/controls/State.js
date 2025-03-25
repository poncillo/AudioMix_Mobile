import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function State({ item, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      {/* Sección de información */}
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.code}>{item.code}</Text>
        <Text style={styles.status}>{item.status ? "Activo" : "Inactivo"}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <AntDesign name="edit" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item?.key)}
          style={styles.deleteButton}
        >
          <AntDesign name="delete" size={24} color={Colors.cinnabar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
  },
  code: {
    color: Colors.oldSilver,
    fontFamily: Fonts.family.light,
    fontSize: Fonts.size.small,
  },
  status: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    color: item => (item.status ? Colors.green : Colors.red),
  },
  deleteButton: {
    marginLeft: 15,
  },
});
