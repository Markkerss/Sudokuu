import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, Button } from 'react-native';

export default function Home({navigation, route}) {
  const {difficulty, name} = route.params

  function goToGame() {
    navigation.navigate('Game', {
      difficulty,
      name
    })
  }

  function goToHome() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text>Thanks for playing {name}!</Text>
      <Text>Would you like to play again?</Text>
      <Button
        onPress={goToHome}
        title="Yes"
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