import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput,FlatList,Button } from 'react-native';


export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Username:</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.text}>Password:</Text>
      <TextInput secureTextEntry='true'

      style={styles.input}></TextInput>
      <Button
      title="Login"
      onPress={() => navigation.navigate('MainMenu')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      fontSize:20
    },
    input:{
      minWidth:300,
      borderColor:'grey',
      borderWidth:1,
      padding:3,
      margin:10
    },
  });