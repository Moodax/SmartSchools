import { NavigationContainer } from '@react-navigation/native';
import React,{useState,Component} from 'react';
import { Text, View, StyleSheet, TextInput,FlatList,Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
    
  }

  userLogin=()=>{
    
    const{username}=this.state;
    const{password}=this.state;
    
    fetch('http://smartschools.c1.biz/connection.php',{
    method:'post',
    header:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      username:username,
      password:password
    })
  }) 
    .then(response => response.json())
      .then(responseJson=>{
        if(responseJson=='1'){
          this.props.navigation.navigate('MainMenu',{username:username})
        }
        else
        alert(responseJson);
      })
      .catch((error)=>{
        console.error(error);
      });

  }
render(){
  return (
    
    <View style={styles.container}>

    <Text style={styles.text}>Username:</Text>

      <TextInput style={styles.input} 
        onChangeText={(username) => this.setState({ username })}
      />

      <Text style={styles.text}>Password:</Text>

      <TextInput secureTextEntry={true}
      style={styles.input}
      onChangeText={(password) => this.setState({ password })}
      />

      <Button
      title="Login"
      onPress={this.userLogin}
      />
    </View>
  );
}
}

export default withNavigation(Login);

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