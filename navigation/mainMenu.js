import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,Button, FlatList,ActivityIndicator } from 'react-native';
import SubjectCard from './subjectCard';
import { Dimensions } from 'react-native';
import { render } from 'react-dom';

export default function MainMenu({ navigation }) {
  var [subjects,setSubjects]=useState([])
  const [isLoading, setLoading] = useState(true);
    
  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch('http://smartschools.c1.biz/get_subjects.php',{
      method:'post',
    header:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      username:navigation.getParam('username')
    })
    })
      const data = await response.json();
      for(let i = 0; i < data.length; i++) {
        subjects.push({
          key: i,
          name:data[i][1]
        });
      }
    setLoading(false);
    }
    
  }, []);

    const pressHandler=(name)=>{
      navigation.navigate('Chapters',{name:name.name,username:navigation.getParam('username')})
    }
    const rows=Math.trunc(Dimensions.get('window').width/267);
    if(rows<1)
    rows=1;
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        shouldComponentUpdate={true}
      showsVerticalScrollIndicator={false}
        numColumns={rows}
        data={subjects}
        extraData={subjects}
        keyExtractor={(item)=>item.key.toString()}
        renderItem={({item})=>(
          <SubjectCard item={item} pressHandler={pressHandler}/>
        )}
      />
      )}

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