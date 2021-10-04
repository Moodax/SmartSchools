import React,{useState} from 'react';
import { Text, View, StyleSheet,Button, FlatList } from 'react-native';
import SubjectCard from './subjectCard';
import { Dimensions } from 'react-native';

export default function MainMenu({ navigation }) {
  const [subjects,setSubjects]=useState([
    {
      key:1,
      name:'Hrvatski jezik'
    },
    {
      key:2,
      name:'Matematika'
    },
    {
      key:3,
      name:'Engleski jezik'
    },
    {
      key:4,
      name:'Fizika'
    },
    {
      key:5,
      name:'Programiranje'
    },
    {
      key:6,
      name:'Elektrotehnika'
    },
    {
      key:7,
      name:'Povijest'
    },
    {
      key:8,
      name:'Geografija'
    },
    {
      key:9,
      name:'Kemija'
    },
    {
      key:10,
      name:'Biologija'
    }
    ]
    )
    const pressHandler=(name)=>{
      navigation.navigate('Library', name)
    }
    const rows=Math.trunc(Dimensions.get('window').width/247);
    if(rows<1)
    rows=1;
  return (
    <View style={styles.container}>
      
      <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={rows}
        data={subjects}
        keyExtractor={(item)=>item.key.toString()}
        renderItem={({item})=>(
          <SubjectCard item={item} pressHandler={pressHandler}/>
        )}
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
      width:'100%'
    },
    
  });