import axios from "axios"

export function setQuestionBoard (newFilms) {
  return {
    type: 'setQuestionBoard',
    newQuestion
  }
}

export function setQuestionBoardAsync(difficulty) {
  return (dispatch) => (
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(data => {
        dispatch(setQuestionBoard(data.data.board))
      })
      .catch(err => {
        console.log(err)
      })
  )
}