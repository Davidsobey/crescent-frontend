import { combineReducers } from 'redux'
import {
  login,
} from './actions'

function todos(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp