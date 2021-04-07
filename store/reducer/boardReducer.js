const initialState = {
  questionBoard: []
}

export default function reducer (state=initialState, action) {
  if (action.type === 'setQuestionBoard') {
    return {...state, questionBoard: action.newQuestion}
  }
  return state
}