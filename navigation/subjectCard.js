import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


export default function SubjectCard({item,pressHandler}){
    return(
        <TouchableOpacity style={styles.card} onPress={()=>pressHandler(item)}>
        <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
card:{
    borderStyle:'dashed',
    borderWidth:1,
    borderRadius:10,
    width:247,
    height:400,
    borderColor:'grey',
    margin:10,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
},
text:{
    fontSize:20,
    fontWeight:'bold',
}
})