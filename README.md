# 🥷 Scholar Ninja

Scholar Ninja is a revolutionary scholarship resource platform designed to empower students to find scholarships efficiently. Our platform utilizes AI to extract scholarship data from user-provided scholarship websites and organizes this information into a personalized list. With Scholar Ninja, students can effortlessly find scholarships that match their criteria without the headache of sifting through paragraphs of text.

## 💡 Inspiration
During the 2020-2021 college application cycle, a friend's experience of managing college applications and financial aid documents served as the catalyst for Scholar Ninja. The platform aims to streamline the scholarship search process for students, particularly those from low-income and first-generation international backgrounds.

## ⚙️ Getting Started
To get started with Scholar Ninja, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/rtrinh760/scholar-ninja.git
   ```
2. Navigate to the project directory:
   ```bash
   cd scholar-ninja
   ```
3. Install the required dependencies for both the frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   pip install -r requirements.txt
   ```
4. Start the application:
* For the frontend (mobile app), you can use Expo Go:
  ```bash
  cd frontend
  npx expo start
  ```
* For the backend (Flask), run the following command in the backend directory:
  ```bash
  flask run
  ```
* You can now access the Scholar Ninja mobile app and interact with the platform.

## 👨‍💻 Technologies Used

Scholar Ninja leverages several technologies, including:

* React Native and Expo Go for the mobile app's user interface.
* Flask for the backend server.
* Firebase for various functionalities.
* ScraperBee for web scraping.
* ChatGPT API for efficient organization of scholarship information.
* React Navigation for handling app navigation.
* React Vector Icons for icon usage.

## 🔥 Challenges Faced

* One of the significant challenges we encountered was related to web scraping. Initially, we faced difficulties with authorization for POST and GET requests. However, we successfully overcame this challenge by adopting the ScraperBee library, allowing us to obtain scholarship data efficiently.
* Throughout the development of Scholar Ninja, we had the opportunity to learn and implement various technologies that came with quite a learning curve, including Expo Go, Flask, Firebase, GPT-3 API, and more.

## 🚀 Scholar Ninja represents just the beginning of our journey. In the future, we plan to:

* Build an administrative dashboard that allows college counselors to view high-level data of their students, including tracking the number of scholarships in progress, total funding awarded, and student preferences for specific types of scholarships.
* Include a centralized application hub, similar to the Common App but for scholarships, where students can fill out forms once and submit them to multiple scholarships with ease.
* Launch Scholar Ninja with pilot groups of students and administrators to gather feedback and continually improve the platform.

As a team, we're proud of the support and collaboration we provided to each other during this project. We are excited about the educational access that Scholar Ninja aims to offer, particularly to students who need it most. Individually, we are empowered by the new technologies and skills we acquired during the development of Scholar Ninja.

Feel free to contribute to Scholar Ninja, and help us make scholarship searching easier for students!


