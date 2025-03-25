import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomerSupport = ({ navigation }) => {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "Normal",
  });

  // Ejemplo de tickets (en una app real, estos vendrían de una base de datos)
  const [tickets] = useState([
    {
      id: "1",
      subject: "Problema con micrófono XM-200",
      description: "El micrófono no está captando señal",
      status: "Abierto",
      date: "2024-02-20",
      priority: "Alta",
    },
    {
      id: "2",
      subject: "Consulta sobre garantía",
      description:
        "Necesito información sobre la garantía de mi interfaz de audio",
      status: "Respondido",
      date: "2024-02-18",
      priority: "Normal",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Abierto":
        return "#ff9800";
      case "Respondido":
        return "#4caf50";
      case "Cerrado":
        return "#9e9e9e";
      default:
        return "#fff";
    }
  };

  const handleSubmitTicket = () => {
    // Aquí iría la lógica para enviar el ticket
    console.log("Nuevo ticket:", newTicket);
    setShowNewTicket(false);
    setNewTicket({ subject: "", description: "", priority: "Normal" });
    alert("Ticket creado exitosamente");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Technical Support")}
        >
          <Icon name="arrow-back" size={24} color="white" /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SOPORTE AL CLIENTE</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/AudioMixlogo-01.png")}
          style={styles.logo}
        />
      </View>

      {/* New Ticket Button */}
      <TouchableOpacity
        style={styles.newTicketButton}
        onPress={() => setShowNewTicket(true)}
      >
        <Icon name="add" size={24} color="white" />
        <Text style={styles.newTicketButtonText}>Nuevo Ticket</Text>
      </TouchableOpacity>

      {/* Tickets List */}
      <ScrollView style={styles.ticketsList}>
        {tickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.ticketItem}
            onPress={() => {
              /* Aquí iría la navegación al detalle del ticket */
            }}
          >
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketSubject}>{ticket.subject}</Text>
              <Text
                style={[
                  styles.ticketStatus,
                  { color: getStatusColor(ticket.status) },
                ]}
              >
                {ticket.status}
              </Text>
            </View>
            <Text style={styles.ticketDescription} numberOfLines={2}>
              {ticket.description}
            </Text>
            <View style={styles.ticketFooter}>
              <Text style={styles.ticketDate}>{ticket.date}</Text>
              <Text
                style={[
                  styles.ticketPriority,
                  { color: ticket.priority === "Alta" ? "#ff5252" : "#fff" },
                ]}
              >
                Prioridad: {ticket.priority}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* New Ticket Modal */}
      <Modal visible={showNewTicket} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Ticket de Soporte</Text>
              <TouchableOpacity onPress={() => setShowNewTicket(false)}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Asunto</Text>
                <TextInput
                  style={styles.input}
                  value={newTicket.subject}
                  onChangeText={(text) =>
                    setNewTicket({ ...newTicket, subject: text })
                  }
                  placeholder="Describe brevemente tu problema"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newTicket.description}
                  onChangeText={(text) =>
                    setNewTicket({ ...newTicket, description: text })
                  }
                  placeholder="Describe detalladamente tu problema"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Prioridad</Text>
                <View style={styles.priorityContainer}>
                  {["Baja", "Normal", "Alta"].map((priority) => (
                    <TouchableOpacity
                      key={priority}
                      style={[
                        styles.priorityButton,
                        newTicket.priority === priority &&
                          styles.priorityButtonActive,
                      ]}
                      onPress={() => setNewTicket({ ...newTicket, priority })}
                    >
                      <Text
                        style={[
                          styles.priorityButtonText,
                          newTicket.priority === priority &&
                            styles.priorityButtonTextActive,
                        ]}
                      >
                        {priority}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitTicket}
              >
                <Text style={styles.submitButtonText}>Enviar Ticket</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  newTicketButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  newTicketButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ticketsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ticketItem: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ticketSubject: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  ticketStatus: {
    fontSize: 14,
    marginLeft: 8,
  },
  ticketDescription: {
    color: "#CCC",
    fontSize: 14,
    marginBottom: 8,
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketDate: {
    color: "#999",
    fontSize: 12,
  },
  ticketPriority: {
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#222",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalForm: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    color: "white",
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#333",
    marginHorizontal: 4,
    alignItems: "center",
  },
  priorityButtonActive: {
    backgroundColor: "#007AFF",
  },
  priorityButtonText: {
    color: "#CCC",
    fontSize: 14,
  },
  priorityButtonTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerSupport;
