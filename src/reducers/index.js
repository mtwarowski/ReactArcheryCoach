import { combineReducers } from 'redux'
import practices from './practices'
import equipment from './equipment'
import scores from './scores'

export default combineReducers({
    practices,
    equipment,
    scores,
})
