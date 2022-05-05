import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity, FlatList,ActivityIndicator} from 'react-native';
import SubjectCard from './subjectCard';
import { useIsFocused } from "react-navigation-hooks";
import { Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function MainMenu({ navigation }) {
  var [notebooks,setNotebooks]=useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const[notebookName,setNotebookName]=useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
      getData();
  }, [isFocused]);

  async function getData() {
    const response = await fetch('http://smartschools.c1.biz/get_notebooks.php',{
    method:'post',
  header:{
    'Accept':'application/json',
    'Content-type':'application/json'
  },
  body:JSON.stringify({
    id:navigation.getParam('id'),
  })
  })
    const data = await response.json();
    while(notebooks.length!=0)
    {
      notebooks.pop();
    }
    for(let i = 0; i < data.length; i++) {
      notebooks.push({
        key: data[i][0],
        name:data[i][1],
        content:data[i][2]
      });
    }
  setLoading(false);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


   const newNotebook=()=>{
    if(notebookName!=null)
    {
      fetch('http://smartschools.c1.biz/create_notebook.php',{
    method:'post',
    header:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      username:navigation.getParam('username'),
      subject:navigation.getParam('subject'),
      notebookName:notebookName.notebookName,
      id:navigation.getParam('id'),
    })
  }) 
    .then(response => response.json())
      .then(responseJson=>{
        
        setModalVisible(!isModalVisible);
          navigation.navigate('Notebook',{id:responseJson,content:'null',name:notebookName.notebookName});
      })
      .catch((error)=>{
        console.error(error);
      });
    }
  }
    const pressHandler=(item)=>{
      if(item.key==0)
      {
        setNotebookName(null)
        setModalVisible(!isModalVisible);
      }
      else navigation.navigate('Notebook',{id:item.key,content:item.content,name:item.name} )
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
        data={notebooks}
        extraData={notebooks}
        keyExtractor={(item)=>item.key.toString()}
        renderItem={({item})=>(
          <SubjectCard item={item} pressHandler={pressHandler}/>
        )}
      />
      )}
      <Modal isVisible={isModalVisible}
        backdropOpacity={0.4}
        onBackdropPress={toggleModal}>
        <View style={{ flex: 1,backgroundColor:'white',maxHeight:hp('20%'),width:wp('20%'),alignSelf:'center',borderRadius:20}}>
        <View style={{flexDirection:"row",borderBottomColor:'rgb(167,167,170)',borderBottomWidth:1}}>
          <Text style={{fontSize:hp('2%'),color:'rgb(151,149,151)',marginLeft:5}}>New notebook</Text>
          </View>
          <View style={{justifyContent:'center'}}>
          <TextInput placeholder="Enter new notebook name" style={{minWidth:wp('10%'),borderBottomColor:'grey',borderBottomWidth:1,padding:3,margin:10}}
          onChangeText={(notebookName) => setNotebookName({notebookName})}></TextInput>
          </View>
          <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',margin:30}}>
          <TouchableOpacity
        onPress={newNotebook}
        style={styles.button}>
        <Text style={{fontSize:hp('3%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleModal}
        style={styles.button}>
        <Text style={{fontSize:hp('3%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Cancel</Text>
      </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
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
    button:{
      flex:1,
      backgroundColor:"#fff",
      borderRadius:5,
      borderWidth:1,
      borderColor:"#007aff",
      marginHorizontal:20
    },
  });