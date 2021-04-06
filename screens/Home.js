import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, Button } from 'react-native';

export default function Home({navigation}) {
  const [name, setName] = useState('John Doe')
  const [difficulty, setDifficulty] = useState('easy')

  function goToGame() {
    navigation.navigate('Game', {
      difficulty,
      name
    })
  }

  return (
    <View style={styles.container}>
      <Text>Sudoku!</Text>
      <Text>What is your name?</Text>
      <TextInput 
        textAlign='center'
        onEndEditing = {setName}
        key = {Math.random()}
      />      
      <Text>Select Difficulty:</Text>
      <Button 
        onPress = {() => setDifficulty('easy')}
        title= "Easy"
      />
      <Button 
        onPress = {() => setDifficulty('medium')}
        title= "Medium"
      />
      <Button 
        onPress = {() => setDifficulty('hard')}
        title= "Hard"
      />
      <Button 
        onPress = {() => goToGame()}
        title= "Let's Play"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})