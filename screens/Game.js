import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, Button } from 'react-native';
import axios from 'axios'
// import SweetAlert from 'react-native-sweet-alert' 

export default function Game({ route, navigation }) {
  const [editableBoard, setEditableBoard] = useState([])

  const {difficulty, name} = route.params
  useEffect(() => {
    console.log(difficulty)
    axios
    .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(data => {
      setEditableBoard(data.data.board) 
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function fetchBoard () {
    axios
    .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(data => {
      setEditableBoard(data.data.board) 
    })
    .catch(err => {
      console.log(err)
    })
  }

  function onChangeText(text, rowIndex, colIndex) {
    const newBoard = JSON.parse(JSON.stringify(editableBoard))
    newBoard[rowIndex][colIndex] = +text
    setEditableBoard(newBoard) 
  }
  
  const encodeBoard = (editableBoard) => editableBoard.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === editableBoard.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const data = {board: editableBoard}

  function solveBoard() {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.solution)
        setEditableBoard(response.solution)
      })
      .catch(console.warn)
  }

  function validateBoard() {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 'solved') {
          navigation.navigate('Finish', {
            name
          })
        } else {
          alert(response.status)
        }
        // SweetAlert.showAlertWithOptions({
        //   title: response.status,
        //   confirmButtonTitle: 'OK',
        //   confirmButtonColor: '#000',
        //   otherButtonTitle: 'Cancel',
        //   otherButtonColor: '#dedede',
        //   style: 'success',
        //   cancellable: true
        // })
      })
      .catch(console.warn)
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Sudoku!</Text>
        <View style={styles.separatorVertical} key={Math.random()}>
          {
            editableBoard.map((row, rowIndex) => {
              return (
                <View style={styles.row} key={rowIndex}>
                  {
                    row.map((col, colIndex) => {
                      return (
                        <View style={styles.grid} key={rowIndex+ '' + colIndex}>
                          <TextInput 
                            textAlign='center'
                            keyboardType='numeric'
                            value={
                              (col === 0) ? String('') : String(col)
                            }
                            onChangeText = {(text) => onChangeText(text, rowIndex, colIndex)}
                            key = {"" + rowIndex + colIndex}
                          />
                        </View>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
        <View style={styles.row}>
          <Button
            onPress = {solveBoard}
            title= "Solve"
          />
          <View style={styles.separatorHorizontal} key={Math.random()}></View>
          <Button
            onPress = {validateBoard}
            title= "Validate"
          />
        </View>
        <View style={styles.separatorVertical} key={Math.random()}></View>
        <Button
          onPress = {fetchBoard}
          title= "Reset"
        />
      </View>
  ); 
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  },  
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row'
  },  
  grid: {
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: (Dimensions.get('window').width)/11,
    height: (Dimensions.get('window').width)/11
    // margin: 4
  },
  separatorVertical: {
    marginVertical: 10
  },
  separatorHorizontal: {
    marginHorizontal: 7
  }
});
