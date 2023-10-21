import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

const Description = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={style.header}>
            Title of the scholarship
        </Text>
        <Text style={style.description}>
            Description
        </Text>

    </View>
  )
}

const styles = StyleSheet.create({

})

export default Description
