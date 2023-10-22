import React, { useState } from "react";
// import OpenAI from "openai";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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

const Dashboard = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [scholarships, setScholarships] = useState(scholarships1);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const searchScholarships = () => {};

  const scrapeScholarshipWebsite = async () => {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scholarship Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon
            name="user"
            size={30}
            color="white"
            style={styles.profileIcon}
            onPress={() => navigation.navigate("ProfileMenu")}
          />
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
          <TouchableOpacity
            style={styles.scholarshipItem}
            key={item.id}
            onPress={() => {}}
          >
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
