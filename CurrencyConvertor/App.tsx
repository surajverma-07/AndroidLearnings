import { View, Text,StyleSheet, ImageSourcePropType, Image, SafeAreaView } from 'react-native'

import React,{PropsWithChildren} from 'react'


type CardProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}> 

const Card = ({ text, imageUrl }: { text: string; imageUrl: ImageSourcePropType }) => {
   return(
     <View style={styles.card}>
        <Text style={[styles.cardText]}>{text}</Text>
        <Image source={imageUrl} style={{width: 100, height: 100}} />
     </View>
   )
}
const App = () => {
  return (
    <SafeAreaView>
      <View>
         <Text>Currency Converter</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card:{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
})
export default App