import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import {setQuestionBoard} from '../store/setBoard'

export default function Game({ route, navigation }) {
  const [editableBoard, setEditableBoard] = useState([])
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const { questionBoard } = useSelector(state => state.boardReducer)

  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const {difficulty, name} = route.params
  useEffect(() => {
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(data => {
        setEditableBoard(data.data.board)
        dispatch(setQuestionBoard(data.data.board))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function onChangeText(text, rowIndex, colIndex) {
    const newBoard = JSON.parse(JSON.stringify(editableBoard))
    newBoard[rowIndex][colIndex] = +text
    setEditableBoard(newBoard) 
  }
  
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const data1 = {board: questionBoard}
  const data2 = {board: editableBoard}

  function solveBoard() {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data1),
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
      body: encodeParams(data2),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.status)
        if (response.status === 'solved') {
          navigation.navigate('Finish', {
            name
          })
        } else {
          toggleAlert()
          console.log(visible)
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
                        <View style={{...styles.grid, backgroundColor: (col === 0) ? 'white' : 'powderblue'}} key={rowIndex+ '' + colIndex}>
                          <TextInput 
                            editable={questionBoard[rowIndex] && questionBoard[rowIndex][colIndex] === 0}
                            textAlign='center'
                            keyboardType='number-pad'
                            value={
                              (col === 0 || col === null || typeof col !== 'number'|| col>9) ? String('') : String(col)
                            }
                            onChangeText = {(text) => onChangeText(text, rowIndex, colIndex)}
                            key = {"" + rowIndex + colIndex}
                            style={{color:'black'}}
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
          <TouchableOpacity
            style={styles.buttonRow} 
            onPress = {solveBoard}
          >
            <Text style={styles.buttonText}>Solve</Text>
          </TouchableOpacity>
          <View style={styles.separatorHorizontal} key={Math.random()}></View>
          <TouchableOpacity
            style={styles.buttonRow} 
            onPress = {() => validateBoard()}
            >
            <Text style={styles.buttonText}>Validate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorVertical} key={Math.random()}></View>
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
          <Text style={{ marginTop: -16, marginBottom: 32, fontSize:20 }}>Please try again</Text>
          <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
            <Text style={styles.btnText}>OK</Text>
          </TouchableOpacity>
        </FancyAlert>
      </View>
  ); 
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginBottom: 30
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
  buttonRow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight:5,
    marginTop: 20,
    height: 60,
    width:100
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
});
