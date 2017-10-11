import { combineReducers } from 'redux'

import { polls } from './polls';
import { comments } from './comments';
import { flashMessages } from './flashMessages';

export default combineReducers({
  polls,
  comments,
  flashMessages
})
