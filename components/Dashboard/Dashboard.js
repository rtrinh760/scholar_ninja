import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Modal, Button } from "react-native";
const scholarships = [
  { id: 1, title: "Scholarship 1" },
  { id: 2, title: "Scholarship 2" },
  { id: 3, title: "Scholarship 3" },
  
];

const Dashboard = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goToProfile = () => {
    
    navigation.navigate("Profile");
  };

  const searchScholarships = () => {

  };

  const scrapeScholarshipWebsite = () => {
    
    toggleModal(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scholarship Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="user" size={30} color="white" style={styles.profileIcon} onPress={()=> navigation.navigate("ProfileMenu")} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Scholarships"
        onChangeText={searchScholarships}
      />

      <ScrollView style={styles.scholarshipList}>
        <Text style={styles.listTitle}>Available Scholarships</Text>
        {scholarships.map((item) => (
          <TouchableOpacity style={styles.scholarshipItem} key={item.id} onPress={()=> {}}>
            <Text style={styles.scholarshipTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Website URL to Scrape</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Website URL"
            onChangeText={(text) => setUrl(text)}
          />
          <Button title="Scrape" onPress={scrapeScholarshipWebsite} />
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  profileIcon: {
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  scholarshipList: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scholarshipItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    padding: 20,
  },
  scholarshipTitle: {
    fontSize: 18,
  },
  menu: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
});

export default Dashboard;
