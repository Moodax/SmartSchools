import React,{useState,Component} from 'react';
import { Dimensions,StyleSheet, View,Button } from 'react-native';
import CanvasDraw from "react-canvas-draw";
import { withNavigation } from 'react-navigation';
import ColorPicker from 'react-native-wheel-color-picker';
  class Library extends Component{
    constructor(props){
      super(props)
      this.canvas = React.createRef();
      this.state={
        currentColor:'#000000',
        value:'0.0'
      }
      
    }
    
    onColorChange=(color)=>{
      this.setState({
        currentColor: color
      });
    }
  render(){
    return (
    <View style={styles.container}>
    <View style={{ backgroundColor: "rgb(245, 245, 245)", flex: 0.2}} >
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
    <View style={{padding:50}} >
     
    </View>
    </View>
    <View style={{ backgroundColor: "red", flex: 0.8,maxHeight:"100%",maxWidth:"100%" }}  >
    <CanvasDraw style={{ position:'relative',height:'100%',width:'100%' }}
    ref={this.canvas}
    canvasHeight={Dimensions.get('window').height}
     canvasWidth={Dimensions.get('window').width}
     brushColor={this.state.currentColor}
      hideGrid
     />
     </View>
     </View>
  )
  
  }}

  export default withNavigation(Library);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
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
  });





















  /*const canvasRef=useRef(null)
  const contextRef=useRef(null)
  const[isDrawing,setIsDrawing]=useState(false);
  useEffect(()=>{
      const canvas=canvasRef.current;
      canvas.width=window.innerWidth*2;
      canvas.height=window.innerHeight*2;
      canvas.style.width='${window.innerWidth}px';
      canvas.style.height='${window.innerHeight}px';
      const context=canvas.getContext("2d")
      context.lineCap="round";
      context.scale(2,2)
      context.strokeStyle="black"
      context.lineWidth=5
      contextRef.current=context;
  },[])






  const startDrawing=({nativeEvent})=>{
    const {offsetX,offsetY}=nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }
  const stopDrawing=()=>{
    setIsDrawing(false)
  }

  const draw=({nativeEvent})=>{
    if(!isDrawing)
    {
      return
    }
    const{offsetX,offsetY}=nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()
    
  }



  return (

    <canvas
    onMouseDown={startDrawing}
    onMouseUp={stopDrawing}
    onMouseMove={draw}
    ref={canvasRef}
    />*/



    /*<View style={styles.container}>
      <Text style={styles.text}>Odabrali ste predmet naziva {navigation.getParam('name')}!</Text>
      <Button title="Otvori PDF knjigu" 
        onPress={() => OpenAnything.Pdf('http://www.africau.edu/images/default/sample.pdf')}
      />
    </View>*/
  //);
