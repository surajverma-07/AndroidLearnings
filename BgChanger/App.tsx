import { View, Text, StyleSheet, StatusBar,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const App = () => {
  const [bgColor, setBgColor] = useState('white');
  const [box1Color, setBox1Color] = useState('blue');
  const [box2Color, setBox2Color] = useState('green');
  const [box3Color, setBox3Color] = useState('red');
  const [box4Color, setBox4Color] = useState('yellow');
  const generateColor =()=>{
    const haxRange = '0123456789ABCDEF';
    let color = '#';
    let box1 = '#';
    let box2 = '#';
    let box3 = '#';
    let box4 = '#';
    for (let i = 0; i < 6; i++) {
      color += haxRange[Math.floor(Math.random() * 16)];
      box1 += haxRange[Math.floor(Math.random() * 16)];   
      box2 += haxRange[Math.floor(Math.random() * 16)];
      box3 += haxRange[Math.floor(Math.random() * 16)];
      box4 += haxRange[Math.floor(Math.random() * 16)];
    }
    // setBgColor(color);
    setBox1Color(box1); 
    setBox2Color(box2);
    setBox3Color(box3);
    setBox4Color(box4);
  }
  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
         <View style={styles.box}>
            <View style={[styles.box1,{backgroundColor:box1Color}]}>box 1</View>
            <View style={[styles.box1,{backgroundColor:box2Color}]}>box 2</View>
            <View style={[styles.box1,{backgroundColor:box3Color}]}>box 3</View>
            <View style={[styles.box1,{backgroundColor:box4Color}]}>box 4</View>
         </View>
         <TouchableOpacity onPress={generateColor}>
          <View style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Press Me</Text>
          </View>
         </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  actionBtn:{
    borderRadius:20,
    backgroundColor:'pink',
    paddingVertical:10,
    paddingHorizontal:20,
  },
  actionBtnText:{
    fontSize:16,
    color:'white',
    textTransform:'uppercase',
  },
  box:{
    marginTop: 20,
    display: 'flex',
    flexWrap:'wrap',
    flexDirection: 'row',
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1:{
    width: 150,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
  },
})
export default App