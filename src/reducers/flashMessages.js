import {
  ADD_FLASH_MESSAGE
} from './actions/flashMessages';
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
    default :
      return state
  }
}
