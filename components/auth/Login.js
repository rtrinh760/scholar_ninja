import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onSignin = this.onSignin.bind(this);
  }

  onSignin() {
    const { name, email, password } = this.state;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>ScholarSheets</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
          />
          <Button title="Login" onPress={() => this.onSignin()} color="#4CAF50" />
          <Text onPress={()=> this.props.navigation.navigate('Register')}>Don't have an Account?</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50', 
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50', 
    marginBottom: 20,
  },
});

export default Login;
