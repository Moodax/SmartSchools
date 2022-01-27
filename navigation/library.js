import React from 'react';
import { Dimensions,StyleSheet, View } from 'react-native';
import CanvasDraw from "react-canvas-draw";
import { withNavigation } from 'react-navigation';

  function Library({ navigation }) {
  return (
    <View style={styles.container}>
    <View style={{ backgroundColor: "rgb(245, 245, 245)", flex: 0.2}} >
    </View>
    <View style={{ backgroundColor: "red", flex: 0.8,maxHeight:"100%",maxWidth:"100%" }}  >
    <CanvasDraw style={{ position:'relative',height:'100%',width:'100%' }}
    
    canvasHeight={Dimensions.get('window').height}
     canvasWidth={Dimensions.get('window').width}
     brushColor='black'
      hideGrid
     />
     </View>
     </View>
  )
  
  }
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
