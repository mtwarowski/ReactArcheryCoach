import { combineReducers } from 'redux'
import targetFaces from './targetFaces'
import practices from './practices'
import equipment from './equipment'
import scores from './scores'

export default combineReducers({
    targetFaces,
    practices,
    equipment,
    scores,
})
