import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, { Component } from 'react'

import Landing from './components/auth/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name='Landing' options={{headerShown: true}} component={Landing}/>
          <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
          <Stack.Screen name='Register' options={{headerShown: false}} component={Register}/>
            
        </Stack.Navigator>
      </NavigationContainer>
      </>
    )
  }
}

export default App


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
