import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ScrollView, Modal, Button } from "react-native";
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
        <TouchableOpacity onPress={goToProfile}>
          <Image source={require("../../assets/profile.png")} style={styles.profileIcon} />
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
          <TouchableOpacity style={styles.scholarshipItem} key={item.id}>
            <Text style={styles.scholarshipTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleModal}>
          <Image source={require("../../assets/plus.png")} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
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
    backgroundColor: "#F2F2F2",
    padding: 20,
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 20,
    marginBottom: 20,
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
    width: 30,
    height: 30,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  scholarshipList: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scholarshipItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    padding: 20,
  },
  scholarshipTitle: {
    fontSize: 18,
    color: "#333",
  },
  menu: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  plusIcon: {
    width: 50,
    height: 50,
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
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
});

export default Dashboard;
