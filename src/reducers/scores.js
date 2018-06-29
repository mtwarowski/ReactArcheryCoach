import * as scoresActions from '../actions/scores'

const initialState = {
    isLoading: true,
    tournamentRounds: null
}

const scores = (state = initialState, action) => {
    switch (action.type) {
        case scoresActions.GETALL_TOURNAMENTROUNDS_REQUESTED:
            return {
                ...state,
                tournamentRounds: null,
                isLoading: true
            }

        case scoresActions.GETALL_TOURNAMENTROUNDS_LOADED:
            return {
                ...state,
                tournamentRounds: action.data,
                isLoading: false
            }

        case scoresActions.GETALL_TOURNAMENTROUNDS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }

        default:
            return state
    }
}

export default scores;