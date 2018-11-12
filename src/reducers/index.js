import { combineReducers } from 'redux'
import practices from './practices'
import equipment from './equipment'
import scores from './scores'
import intensities from './intensities'

export default combineReducers({
    practices,
    equipment,
    scores,
    intensities
})
