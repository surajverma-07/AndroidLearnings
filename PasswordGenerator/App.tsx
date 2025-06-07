import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons'; 

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let list = '';
    if (lowerCase) list += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) list += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) list += '0123456789';
    if (symbols) list += '!@#$%^&*()_+[]{}|;:,.<>?';

    if (list.length === 0) {
      Alert.alert('Error', 'Please select at least one character type.');
      return;
    }

    const passwordRes = createPassword(list, passwordLength);
    setPassword(passwordRes);
    setIsPasswordGenerated(true);
    setShowPassword(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    setShowPassword(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(password);
    Alert.alert('Copied!', 'Password copied to clipboard');
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (lowerCase) score++;
    if (upperCase) score++;
    if (numbers) score++;
    if (symbols) score++;

    switch (score) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Moderate';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>🔐 Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              try {
                generatePasswordString(+values.passwordLength);
              } catch (error) {
                console.error(error);
                resetPasswordState();
              }
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleReset,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.subTitle}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                    onChangeText={handleChange('passwordLength')}
                    value={values.passwordLength}
                  />
                </View>

                {/** Checkboxes */}
                {[
                  {label: 'Lowercase (abc...)', value: lowerCase, onChange: () => setLowerCase(!lowerCase)},
                  {label: 'Uppercase (ABC...)', value: upperCase, onChange: () => setUpperCase(!upperCase)},
                  {label: 'Numbers (123...)', value: numbers, onChange: () => setNumbers(!numbers)},
                  {label: 'Symbols (!@#...)', value: symbols, onChange: () => setSymbols(!symbols)},
                ].map((item, index) => (
                  <View key={index} style={styles.inputWrapper}>
                    <Text style={styles.heading}>{item.label}</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      fillColor="#5DA3FA"
                      unFillColor="#FFFFFF"
                      isChecked={item.value}
                      onPress={item.onChange}
                      iconStyle={{borderColor: '#16213e'}}
                    />
                  </View>
                ))}

                {/** Buttons */}
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid || isSubmitting}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPasswordGenerated && (
          <View style={styles.resultContainer}>
            <Text style={styles.subTitle}>Generated Password:</Text>
            <Text style={styles.generatedPassword}>
              {showPassword ? password : '*'.repeat(password.length)}
            </Text>

            <Text style={styles.strength}>
              Strength: {getPasswordStrength()}
            </Text>

            <View style={styles.resultActions}>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.subTitle}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={25}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  inputWrapper: {
    marginVertical: 10,
  },
  inputColumn: {
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  heading: {
    fontSize: 16,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryBtn: {
    backgroundColor: '#5DA3FA',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  secondaryBtnTxt: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    elevation: 3,
  },
  generatedPassword: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '60%',
  },
  strength: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
export default App;