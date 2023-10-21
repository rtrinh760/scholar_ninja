import React from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const Landing = ({navigation}) => {
  return (
    <View>
        <Button title='Login' onPress={() => navigation.navigate('Login')} />
        <Button title='Register' onPress={() => navigation.navigate('Register')}/>

    </View>
  )
}

export default Landing
