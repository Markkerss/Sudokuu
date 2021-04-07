import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts'

export default function Home({navigation}) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [visible, setVisible] = useState(false)

  function goToGame() {
    if (name === '') {
      toggleAlert()
    } else {
      navigation.navigate('Game', {
        difficulty,
        name
      })
    }
  }

  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          borderRadius: 50,
          width: '100%',
        }}><Text>😔</Text></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32, fontSize:20 }}>Please enter your name and select a difficulty</Text>
        <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </FancyAlert>
      <Text style={{fontFamily: 'sans-serif', fontSize: 50, marginBottom: 15}}>Sudoku!</Text>
      <Text style={{fontSize: 25}}>Name:</Text>
      <TextInput 
        style={{"borderBottomWidth": 2, width:200}}
        textAlign='center'
        onChangeText = {setName}
        value={name}
        key = {Math.random()}
      />      
      <Text style={{marginTop:20, fontSize: 25}}>Select Difficulty:</Text>
      <TouchableOpacity
        style={styles.button} 
        onPress = {() => {setDifficulty('easy')}}
      >
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button} 
        onPress = {() => setDifficulty('medium')}
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button} 
        onPress = {() => setDifficulty('hard')}
      >
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSubmit} 
        onPress = {() => goToGame()}
      >
        <Text style={styles.buttonText}>Let's Play!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 90,
    marginRight: 90,
    marginTop: 20,
    height: 60
  },
  buttonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 90,
    marginRight: 90,
    marginTop: 40,
    height: 60
  },
  buttonText: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    marginBottom: 5
  },
  btnText: {
    color: '#FFFFFF',
  }
})