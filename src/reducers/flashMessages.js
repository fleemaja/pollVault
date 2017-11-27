import {
  ADD_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGES
} from '../actions/flashMessages';
import shortid from 'shortid';

export function flashMessages(state = [], action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE :
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    case CLEAR_FLASH_MESSAGES :
      return []
    default :
      return state
  }
}
