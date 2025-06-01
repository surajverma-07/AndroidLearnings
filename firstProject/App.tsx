import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import FlatCards from './components/FlatCards'
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <Text>App</Text>
      </ScrollView>
      <FlatCards />
    </SafeAreaView>
  )
}

export default App