import { StyleSheet, Text, View ,useColorScheme} from 'react-native'
import React from 'react'

export default function FlatCards() {
    const isDark = useColorScheme()==='dark';
  return (
    <View>
      <Text style={[styles.headingText,{color:isDark?'white':'black'}]}>FlatCards</Text>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: 'red' }]}>
          <Text style={styles.cardText}>Card 1</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'blue' }]}>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'green' }]}>
          <Text style={styles.cardText}>Card 3</Text>
        </View>
        <View style={[styles.card, { backgroundColor: 'purple' }]}>
          <Text style={styles.cardText}>Card 4</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin:1,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  cardText: {
    color: 'white',
    fontSize: 18,
  }
})
