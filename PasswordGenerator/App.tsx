import { View, Text } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { create } from 'react-test-renderer';

const passwordSchema = Yup.object().shape({
    passwordLength:Yup.number()
     .min(4,'Password must be at least 4 characters')
     .max(20,'Password must be at most 20 characters')
     .required('Password length is required'),
})
const App = () => {
  const [password,setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase,setLowerCase] = useState(false);
  const [upperCase,setUpperCase] = useState(false);
  const [numbers,setNumbers] = useState(false);
  const [symbols,setSymbols] = useState(false);

  const generatePasswordString = (passwordLenght:number)=>{
        let list = '';
        if(lowerCase) list += 'abcdefghijklmnopqrstuvwxyz';
        if(upperCase) list += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(numbers) list += '0123456789';
        if(symbols) list += '!@#$%^&*()_+[]{}|;:,.<>?';
        if(list.length === 0) {
          throw new Error('At least one character type must be selected');
        }
        const passwordRes = createPassword(list,passwordLenght);
        setPassword(passwordRes);
        setIsPasswordGenerated(true);
  }

  const createPassword = (characters:string,passwordLength:number)=>{
    let result = '';
     for(let i=0;i<passwordLength;i++){
      const randomIndex = Math.round(Math.random() * characters.length);
      result += characters[randomIndex];
     }
     return result;
  }

  const resetPasswordState =()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  }
  return (
    <View>
      <Text>App It is app </Text>
    </View>
  )
}

export default App