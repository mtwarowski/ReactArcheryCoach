import * as practicesActions from '../actions/practices'

const initialState = {
    page: {},
    isLoading: true,
}

const practices = (state = initialState, action) => {
    switch (action.type) {

        case practicesActions.GETPAGE_PRACTICES_REQUESTED:
            return {
                ...state,
                page: {},
                isLoading: true
            }

        case practicesActions.GETPAGE_PRACTICES_LOADED:
            return {
                ...state,
                page: action.data,
                isLoading: false
            }

        case practicesActions.GETPAGE_PRACTICES_ERROR:
            return {
                ...state,
                error: action.error,
                page: {},
                isLoading: false
            }


        case practicesActions.DELETE_PRACTICES_REQUESTED:
            return {
                ...state,
                isLoading: true
            }

        case practicesActions.DELETE_PRACTICES_LOADED:
            return {
                ...state,
                page: filterOutPracticeOfId(state.page, action.data.practiceId),
                isLoading: false
            }

        case practicesActions.DELETE_PRACTICES_ERROR:
            return {
                ...state,
                error: action.error,
                page: {},
                isLoading: false
            }

        case practicesActions.ADD_PRACTICES_REQUESTED:
            return {
                ...state,
                isSaving: true
            }

        case practicesActions.ADD_PRACTICES_LOADED:
            return {
                ...state,
                isSaving: false
            }

        case practicesActions.ADD_PRACTICES_ERROR:
            return {
                ...state,
                error: action.error,
                isSaving: false
            }
        default:
            return state
    }
}


const filterOutPracticeOfId = (page, practiceId) => {
    if (!page || !page.data) {
        return page;
    }

    return { ...page, data: page.data.filter((p) => p.id !== practiceId) };
}

export default practices;