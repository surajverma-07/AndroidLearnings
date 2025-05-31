import React, { JSX } from "react";
import {
    View ,
    Text ,
    StyleSheet,
    SafeAreaView,
    useColorScheme
} from 'react-native';

function AppPro(): JSX.Element{
    const isDarkMode = useColorScheme()==='dark'
    return(
      <SafeAreaView style={styles.container}>
         <View >
              <Text style={isDarkMode?styles.whiteText:styles.darkText}>
                Hello World
              </Text>
         </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
    },
    whiteText:{
        color:'#FFFFFF'
    },
    darkText:{
        color:'blue'
    }
})
export default AppPro;