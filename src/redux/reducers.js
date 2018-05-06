// import {combineReducers} from 'redux'
import {combineReducers2} from '../libs/redux'
import {INCREMENT, DECREMENT, ADD_MSG} from './action-types'

// 管理count
const initCount = 0
function count (state=initCount, action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

// 管理msgs
const initMsgs = []
function msgs (state=initMsgs, action) {
  console.log('msgs()', state, action)
  switch (action.type) {
    case ADD_MSG:
      // state.unshift(action.data)
      return [action.data, ...state]
    default:
      return state
  }
}

export default combineReducers2({
  count,
  msgs
})

// 整体状态: {count: 2, msgs: ['xxx', 'yyy']}