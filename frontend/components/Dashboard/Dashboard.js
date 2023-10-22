import React, { useState } from "react";
// import OpenAI from "openai";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Button, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { ScrapingBeeClient } from "scrapingbee";

const scholarships1 = [
  { id: 1, title: "Vannessa A. Gonzalez Memorial Scholarship" },
  { id: 2, title: "Servant Ships Scholarship" },
  { id: 3, title: "Bright Lights Scholarship" },
];

const scholarships2 = [
  { id: 4, title: "Grand Oaks Enterprises LLC Scholarship" },
  { id: 5, title: "Carla M. Champagne Memorial Scholarship" },
  { id: 6, title: "Kyle Lam Hacker Scholarship" },
];

async function get(url) {
  const scrapingBeeClient = new ScrapingBeeClient(
    "W9M3DRSN277PWESEA9FG87NA7DDHAAQ3NR6RTB444C11IXY3XDK142VVOSFA8IX04SZKW51CKJT4CNRY"
  );
  const response = await scrapingBeeClient.get({
    url: url,
    params: {
      render_js: "true",
    },
  });
  return response;
}

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function sendMessage(dataScrapedText) {
//   const prompt =
//     "You are a JSON expert who understands how to format data-scraped information into neat JSON objects. You are helping a student who is looking for scholarships. The student has provided you with a link of a scholarship website. You need format the information into a JSON object with the scholarship information. Include fields such as name, description, and date.";

//   // https://platform.openai.com/docs/api-reference/chat/create
//   const completionOutput = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: prompt },
//       { role: "user", content: `${dataScrapedText}` },
//     ],
//     temperature: 0.5,
//     frequency_penalty: 0.5,
//   });

//   const completionResponse =
//     completionOutput.data.choices[0].message?.content.trim() ||
//     "Error occurred. Please try again.";

//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ text: completionResponse }));
// }

const ScholarshipCard = ({ scholarship, onPress }) => (
  <Animatable.View animation="fadeInUp" duration={1000} style={styles.scholarshipCard}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.scholarshipTitle}>{scholarship.title}</Text>
      <Text style={styles.scholarshipDescription}>{scholarship.description}</Text>
    </TouchableOpacity>
  </Animatable.View>
);

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [scholarships, setScholarships] = useState(scholarships1);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);

  };

  const navigateToScholarshipDetails = (scholarship) => {
    navigation.navigate("ScholarshipDetails", { scholarship });
  };

  const searchScholarships = (text) => {
    setSearchText(text);
  };

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.title.toLowerCase().includes(searchText.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const scrapeScholarshipWebsite = () => {
    setScholarships(scholarships2);

    get(url)
      .then((response) => {
        console.log(response)
        const decoder = new TextDecoder();
        const text = decoder.decode(response.data);
        console.log(text);
      })
      .catch((error) => {
        console.log(error);
      });
      
    toggleModal();
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="bars" size={30} color="white" style={styles.profileIcon} onPress={() => navigation.navigate("ProfileMenu")} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Scholarships"
        onChangeText={searchScholarships}
        value={searchText} 
      />


      <FlatList
        data={filteredScholarships}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScholarshipCard scholarship={item} onPress={() => navigateToScholarshipDetails(item)} />
        )}
      />

      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
  <View style={styles.modalContainer}>
  <Image style={styles.logo} source={require('../../assets/logo.png')} />
    <Text style={styles.modalTitle}>Enter Website URL to Scrape</Text>
    <TextInput
      style={styles.modalInput}
      placeholder="Website URL"
      onChangeText={(text) => setUrl(text)}
    />
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={styles.modalButton1}
        onPress={scrapeScholarshipWebsite}
      >
        <Text style={styles.modalButtonText2}>Scrape</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalButton2}
        onPress={toggleModal}
      >
        <Text style={styles.modalButtonText1}>Close</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: "#215D9D",
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 30,
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
  logo: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '15%'
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
  scholarshipCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  scholarshipTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scholarshipDescription: {
    fontSize: 40,
  },

  scholarshipDescription: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  menu: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: "#215D9D",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#215D9D",
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 10,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton1: {
    backgroundColor: "#215D9D",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    width: "45%",
    alignItems: "center",
  },
  modalButton2: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#215D9D",
    width: "45%",
    alignItems: "center",
  },
  modalButtonText1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#215D9D", 
  },
  modalButtonText2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", 
  },
  modalButton1: {
    backgroundColor: "#215D9D",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    width: "45%",
    alignItems: "center",
  },
});

export default Dashboard;