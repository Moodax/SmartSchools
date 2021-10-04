import React from 'react';
import { Text, View, StyleSheet,} from 'react-native';


export default function Library({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Odabrali ste predmet naziva {navigation.getParam('name')}!</Text>
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
    text: {
      fontSize:40,
      fontWeight:'bold',
      textAlign:'center'
    },
  });