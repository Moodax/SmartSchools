import React from 'react';
import { Text, View, StyleSheet,Button} from 'react-native';
import * as OpenAnything from 'react-native-openanything';
export default function Library({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Odabrali ste predmet naziva {navigation.getParam('name')}!</Text>
      <Button title="Otvori PDF knjigu" 
        onPress={() => OpenAnything.Pdf('http://www.africau.edu/images/default/sample.pdf')}
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
    text: {
      fontSize:40,
      fontWeight:'bold',
      textAlign:'center'
    },
  });