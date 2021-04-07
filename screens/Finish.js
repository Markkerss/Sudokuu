import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({navigation, route}) {
  const {name} = route.params

  function goToHome() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, marginBottom: 5}}>Thanks for playing</Text>
      <Text style={{fontSize: 30, marginBottom: 20}}>{name}!</Text>
      <Text style={{fontSize: 20, marginBottom: 15}}>Would you like to play again?</Text>
      <TouchableOpacity
          style={styles.button} 
          onPress = {goToHome}
          >
          <Text style={styles.buttonText}>Home</Text>
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
    marginLeft: 155,
    marginTop: 10,
    height: 60,
    width:100
  },
  buttonText: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
})