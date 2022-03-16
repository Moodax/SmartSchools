import React,{Component,useState} from 'react';
import { Dimensions,StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import CanvasDraw from "react-canvas-draw";
import { withNavigation } from 'react-navigation';
import ColorPicker from 'react-native-wheel-color-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  class Notebook extends Component{
    constructor(props){
      super(props)
      this.canvas = React.createRef();
      this.state={
        currentColor:'#000000',
        thick:1.0,
      }
    }
    componentDidMount() {
      if(this.props.navigation.getParam('content')!="null")
      this.canvas.current.loadSaveData(this.props.navigation.getParam('content'),false);
    }
    getEraser=()=>{
      this.setState({
        currentColor:"#FFF"
      });
    }
    buttonMinus = () => {
      if(this.state.thick>0.6)
      this.setState({
        thick: this.state.thick - 0.5
      });
    };

    buttonPlus = () => {
      this.setState({
      thick: this.state.thick + 0.5
    });
    };

    onColorChange=(color)=>{
      this.setState({
        currentColor: color
      });
      
    }
    saveData=()=>{
      fetch('http://smartschools.c1.biz/update_notebook.php',{
    method:'post',
    header:{
      'Accept':'application/json',
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      id:this.props.navigation.getParam('id'),
      content:this.canvas.current.getSaveData()
    })
  })
  }
  
  render(){
    return (
    <View style={styles.container}>
    <View style={{ backgroundColor: "rgb(252, 252, 252)", flex: 0.2}} >
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity
        onPress={this.saveData}
        style={styles.eraser}>
        <Text style={{fontSize:hp('3%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Save</Text>
      </TouchableOpacity>
      </View>
    <View style={{height:"30%",marginHorizontal:25}}>
    <ColorPicker
					ref={r => { this.picker = r }}
					color={this.state.currentColor}
					swatchesOnly={false}
					onColorChange={this.onColorChange}
					onColorChangeComplete={this.onColorChangeComplete}
					thumbSize={25}
					sliderSize={20}
					noSnap={true}
					row={false}
					swatchesLast={true}
					swatches={true}
					discrete={false}

				/>
    </View>
    
   
    <View style={{padding:50,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
    <TouchableOpacity
        onPress={this.buttonMinus}
        style={styles.roundButton}>
      <Text style={{fontSize:30}}>-</Text>
      </TouchableOpacity>
      <Text style={{width:60,minWidth:60,maxWidth:60,margin:20,textAlign: 'center',fontSize:30}}>{this.state.thick}</Text>
      <TouchableOpacity
        onPress={this.buttonPlus}
        style={styles.roundButton}>
        <Text style={{fontSize:30}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={this.getEraser}
        style={styles.eraser}>
        <Text style={{fontSize:hp('3%'),color:"#007aff",fontWeight:600,alignSelf:'center'}}>Eraser</Text>
      </TouchableOpacity>
    </View>
    </View>
    <View style={{ backgroundColor: "red", flex: 0.8,maxHeight:"100%",maxWidth:"100%"}}  >
    <CanvasDraw style={{ position:'relative',height:'100%',width:'100%' }}
    ref={this.canvas}
    canvasHeight={Dimensions.get('window').height}
     canvasWidth={Dimensions.get('window').width}
     brushColor={this.state.currentColor}
     brushRadius={this.state.thick}
      hideGrid
      loadTimeOffset={2}
      lazyRadius={5}
      immediateLoading={true}
     />
     </View>
     </View>
  )
  
  }}

  export default withNavigation(Notebook);

  const styles = StyleSheet.create({
    container: {
      
      width:'100%',
      flexDirection:"row",
      height:'100%',
      maxHeight:'100%',
      maxWidth:'100%'
    },
    thumb: {
      width: 20,
      height: 20,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 2,
      shadowOpacity: 0.35,
  },
  roundButton: {
    display: 'inline-block',
    color: '#007aff',
    width: hp("5%"),
    height: hp("5%"),
    lineHeight: 50,
    borderRadius: 50,
    borderWidth:2,
    margin:10,
    borderColor:'#007aff',
    textAlign: 'center',
    overflow: 'hidden',
    fontWeight: 'bold',
    backgroundColor:'white'
  },
  eraser:{
    backgroundColor:"#fff",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#007aff",
    padding:5
    }
  
  });


  

  
