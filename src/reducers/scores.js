import * as scoresActions from '../actions/scores'

const initialState = {
    isLoading: false,    
    isSaving: false,
    tournamentRounds: null,
    score: null,
    page: {}
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

        case scoresActions.CREATE_SCORES_REQUESTED:
            return {
                ...state,
                isSaving: true
            }

        case scoresActions.CREATE_SCORES_LOADED:
            return {
                ...state,
                isSaving: false
            }

        case scoresActions.CREATE_SCORES_ERROR:
            return {
                ...state,
                error: action.error,
                isSaving: false
            }

            case scoresActions.GET_SCOREDETAILS_REQUESTED:
            return {
                ...state,
                score: null,
                isSaving: true
            }

        case scoresActions.GET_SCOREDETAILS_LOADED:
            return {
                ...state,
                score: action.data,
                isSaving: false
            }

        case scoresActions.GET_SCOREDETAILS_ERROR:
            return {
                ...state,
                error: action.error,
                score: null,
                isSaving: false
            }

            case scoresActions.GETPAGE_SCORES_REQUESTED:
            return {
                ...state,
                page: {},
                isLoading: true
            }

        case scoresActions.GETPAGE_SCORES_LOADED:
            return {
                ...state,
                page: action.data,
                isLoading: false
            }

        case scoresActions.GETPAGE_SCORES_ERROR:
            return {
                ...state,
                error: action.error,
                page: {},
                isLoading: false
            }

        default:
            return state
    }
}

export default scores;