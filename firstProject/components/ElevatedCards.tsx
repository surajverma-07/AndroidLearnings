import React, { Component } from 'react'
import { Text, View ,StyleSheet,ScrollView,SafeAreaView} from 'react-native'

export class ElevatedCards extends Component {
  render() {
    return (
        <SafeAreaView>
            <View><Text style={styles.headingText}>Elevated Cards</Text></View>
        <ScrollView horizontal style={[styles.container]}>
      <View style={styles.card}>
        <Text> 1 </Text>
      </View>
      <View style={styles.card}>
        <Text> 2 </Text>
      </View>
      <View style={styles.card}>
        <Text> 3 </Text>
      </View>
      <View style={styles.card}>
        <Text> 4 </Text>
      </View>
      <View style={styles.card}>
        <Text> 5 </Text>
      </View>
      <View style={styles.card}>
        <Text> 6 </Text>
      </View>
        </ScrollView>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    headingText: {
     fontSize: 24,
     fontWeight: 'bold',
     paddingHorizontal: 10,
     paddingVertical: 10,
     color:'white'
    },
   container:{
    flexDirection: 'row',
    gap: 4,
    padding:4,
   },
   card:{
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5, 
    shadowColor: 'red',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
   },
})
export default ElevatedCards
