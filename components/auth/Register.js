import React, { Component } from 'react'
import { TextInput } from 'react-native-gesture-handler';

export class Register extends Component {

  constructor(){
    super(props);

    state ={
      name:"",
      email: "",
      password = ""
    }
  }



  render() {
    return (
      <View>
        <Text>
          Register 
        </Text>
        <View>
          <Text>
            Name:
          </Text>
          <TextInput
          placeholder='name'
          onChange={(name)=> }/>
        </View>
      </View>
    )
  }
}

export default Register
