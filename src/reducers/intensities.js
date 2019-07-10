import * as practicesActions from '../actions/practices'
import * as scoresActions from '../actions/scores'

const initialState = {
    daily: { date: "", scores: [], practices: [] },
}

const intensities = (state = initialState, action) => {
    switch (action.type) {
        case practicesActions.GET_PRACTICE_BYDATE_REQUESTED:
            return {
                ...state,
                daily : {...state.daily, practices: []},
                isPracticesLoading: true
            }

        case practicesActions.GET_PRACTICE_BYDATE_LOADED:
            return {
                ...state,
                daily : {...state.daily, practices: action.data || []},
                isPracticesLoading: false
            }

        case practicesActions.GET_PRACTICE_BYDATE_ERROR:
            return {
                ...state,
                error: action.error,
                daily : {...state.daily, practices: []},
                isPracticesLoading: false
            }

        case scoresActions.GET_SCOREDETAILS_BYDATE_REQUESTED:
            return {
                ...state,
                daily : {...state.daily, scores: []},
                isScoresLoading: true
            }

        case scoresActions.GET_SCOREDETAILS_BYDATE_LOADED:
            return {
                ...state,
                daily : {...state.daily, scores: action.data || []},
                isScoresLoading: false
            }

        case scoresActions.GET_SCOREDETAILS_BYDATE_ERROR:
            return {
                ...state,
                error: action.error,
                daily : {...state.daily, scores: []},
                isScoresLoading: false
            }
        default:
            return state
    }
}

export default intensities;