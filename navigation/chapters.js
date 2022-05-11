import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity, FlatList,ActivityIndicator} from 'react-native';
import { useIsFocused } from "react-navigation-hooks";
import SubjectCard from './subjectCard';
import { Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as OpenAnything from 'react-native-openanything';

export default function Chapters({ navigation }) {
  var [chapters,setChapters]=useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const[chapterName,setChapterName]=useState(null);

  const isFocused = useIsFocused();
 
  useEffect(() => {
    setLoading(true);
    while(chapters.length!=0)
    {
      chapters.pop();
    }
    getData();
  }, [isFocused]);


  async function getData() {
    
    let response = await fetch('http://smartschools.c1.biz/get_books.php',{
    method:'post',
  header:{
    'Accept':'application/json',
    'Content-type':'application/json'
  },
  body:JSON.stringify({
    username:navigation.getParam('username'),
    subject:navigation.getParam('name')
  })
  })
    let data = await response.json();
    
    for(let i = 0; i < data.length; i++) {
      if(i==0)
      {
        chapters.push({
          key: data[i][0],
          name:data[i][1],
          link:data[i][2]
        });
      }
      else
      chapters.push({
        key: data[i][0]+110000,
        name:data[i][1],
        link:data[i][2]
      });
    }
    
    response = await fetch('http://smartschools.c1.biz/get_chapters.php',{
    method:'post',
  header:{
    'Accept':'application/json',
    'Content-type':'application/json'
  },
  body:JSON.stringify({
    username:navigation.getParam('username'),
    subject:navigation.getParam('name')
  })
  })
    data = await response.json();
    
    for(let i = 0; i < data.length; i++) {
      
      chapters.push({
        key: data[i][0],
        name:data[i][1],
        link:"null"
      });
    }
  setLoading(false);
  console.log(chapters);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


   const newChapter=()=>{
    if(chapterName!=null)
    {
      fetch('http://smartschools.c1.biz/create_chapter.php',{
    method:'post',
    header:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      username:navigation.getParam('username'),
      subject:navigation.getParam('name'),
      chapterName:chapterName.chapterName
    })
  }) 
    .then(response => response.json())
      .then(responseJson=>{
        
        setModalVisible(!isModalVisible);
          navigation.navigate('Library',{id:responseJson,name:chapterName.chapterName,username:navigation.getParam('username'), subject:navigation.getParam('name')});
      })
      .catch((error)=>{
        console.error(error);
      });
    }
  }
    const pressHandler=(item)=>{
      if(item.key==0)
      {
        setChapterName(null)
        setModalVisible(!isModalVisible);
      }
      else if(item.link!="null")
      {
        OpenAnything.Pdf(item.link);
      }
      else navigation.navigate('Library',{id:item.key,name:item.name,username:navigation.getParam('username'), subject:navigation.getParam('name')} )
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
        data={chapters}
        extraData={chapters}
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
          <Text style={{fontSize:hp('2%'),color:'rgb(151,149,151)',marginLeft:5}}>New chapter</Text>
          </View>
          <View style={{justifyContent:'center'}}>
          <TextInput placeholder="Enter new chapter name" style={{minWidth:wp('10%'),borderBottomColor:'grey',borderBottomWidth:1,padding:3,margin:10}}
          onChangeText={(chapterName) => setChapterName({chapterName})}></TextInput>
          </View>
          <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',margin:30}}>
          <TouchableOpacity
        onPress={newChapter}
        style={styles.button}>
        <Text style={{fontSize:wp('1.4%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleModal}
        style={styles.button}>
        <Text style={{fontSize:wp('1.4%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Cancel</Text>
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