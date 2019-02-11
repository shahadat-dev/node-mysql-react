import isEmpty from '../validation/is-empty'

import { SET_CURRENT_USER, SUCCESS_MSG } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  user: {},
  success: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case SUCCESS_MSG:
      return {
        ...state,
        success: action.payload
      }
    default:
      return state
  }
}
