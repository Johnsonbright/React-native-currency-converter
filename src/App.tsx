import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'


// Constants
import {currencyByRupee} from './constants'
// Components
import CurrencyBtn from './Components/CurrencyBtn'

import Snackbar from 'react-native-snackbar';



const App = ():JSX.Element => {
const[inputValue, setInputValue] = useState('')
const[resultValue, setResultValue] = useState('')
const[targetCurrency, setTargetCurrency] = useState('')

const buttonPressed =(targetValue: Currency) => {
  if(!inputValue) {
    return Snackbar.show({
      text:" Enter a value you want to convert here",
      // duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#EB7B87',
      textColor: '#000000'
    })
  }

  const inputAmount = parseFloat(inputValue)
  if (!isNaN(inputAmount)) {
    const convertedValue = inputAmount * targetValue.value
    const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 🤑`
    setResultValue(result)
    setTargetCurrency(targetValue.name)
  }
  else{
    Snackbar.show({
      text:" Not a valid number",
      // duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#FAE773',
      textColor: '#000000'
    })
  }
}
  
  return (
   <>
 <StatusBar/>
<View style={styles.container}>
<View style={styles.topContainer}>
  <View style={styles.ngnContainer}>
    <Text style={styles.ngn}>₦</Text>
    <TextInput
    maxLength={14}
    value={inputValue}
    clearButtonMode='always' //Only for ios
    onChangeText={setInputValue}
    keyboardType='number-pad'
   placeholder='Enter Number Here'
    />
  </View>
{resultValue && (
  <Text style={styles.resultTxt}>
    {resultValue}
  </Text>
)}
</View>
<View style={styles.bottomContainer}>
  <FlatList
  numColumns={3}
  data={currencyByRupee}
  keyExtractor={item => item.name}
  renderItem={({item}) => (
    <Pressable style={[styles.button, targetCurrency === item.name && styles.selected]}
    onPress={() =>  buttonPressed(item)}
    >
      <CurrencyBtn {...item} />
    </Pressable>
  )}
  />
</View>
</View>

   </>


  ) 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  ngn: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  ngnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 210,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App