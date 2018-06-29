import * as targetFacesActions from '../actions/targetFaces'

const initialState = {
    isLoading: true,
    data: []
}

const targetFaces = (state = initialState, action) => {
    switch (action.type) {
        case targetFacesActions.GETALL_TARGETFACES_REQUESTED:
            return {
                ...state,
                data: null,
                isLoading: true
            }

        case targetFacesActions.GETALL_TARGETFACES_LOADED:
            return {
                ...state,
                data: action.data,
                isLoading: false
            }

        case targetFacesActions.GETALL_TARGETFACES_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }

        case targetFacesActions.SELECT_TARGETFACE_REQUESTED:
            return {
                ...state,
                selected: null,
                isLoading: true
            }

        case targetFacesActions.SELECT_TARGETFACE_LOADED:
            return {
                ...state,
                selected: action.data,
                isLoading: false
            }

        case targetFacesActions.SELECT_TARGETFACE_ERROR:
            return {
                ...state,
                selected: null,
                error: action.error,
                isLoading: false
            }

        default:
            return state
    }
}

export default targetFaces;