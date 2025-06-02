import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import FlatCards from './components/FlatCards'
import ElevatedCards from './components/ElevatedCards'
import FancyCard from './components/FancyCard'
const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <Text>App</Text>
      </ScrollView>
      <FlatCards />
      <ElevatedCards/>
      <FancyCard />
    </SafeAreaView>
  )
}

export default App