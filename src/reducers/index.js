import { combineReducers } from 'redux'

import { polls } from './polls';
import { comments } from './comments';

export default combineReducers({
  polls,
  comments
})
