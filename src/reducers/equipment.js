import * as equipmentActions from '../actions/equipment'

import {filterOutByKey, mapFirebaseObjectToArray} from '../helpers/dataMapping'

const initialState = {
    bows: null,
    arrows: null,
    defaultBow: null,
    defaultArrows: null,
    isLoading: true,
}

const equipment = (state = initialState, action) => {
    switch (action.type) {

        case equipmentActions.GETALL_BOWS_REQUESTED:
            return {
                ...state,
                bows: null,
                isLoading: true
            }

        case equipmentActions.GETALL_BOWS_LOADED:
            return {
                ...state,
                bows: mapFirebaseObjectToArray(action.data),
                isLoading: false
            }

        case equipmentActions.GETALL_BOWS_ERROR:
            return {
                ...state,
                error: action.error,
                bows: null,
                isLoading: false
            }

        case equipmentActions.GET_BOWS_DEFAULT_REQUESTED:
            return {
                ...state,
                defaultBow: null,
                isLoading: true
            }

        case equipmentActions.GET_BOWS_DEFAULT_LOADED:
            return {
                ...state,
                defaultBow: mapFirebaseObjectToArray(action.data)[0],
                isLoading: false
            }

        case equipmentActions.GET_BOWS_DEFAULT_ERROR:
            return {
                ...state,
                error: action.error,
                defaultBow: null,
                isLoading: false
            }

        case equipmentActions.GETALL_ARROWS_REQUESTED:
            return {
                ...state,
                arrows: null,
                isLoading: true
            }

        case equipmentActions.GETALL_ARROWS_LOADED:
            return {
                ...state,
                arrows: mapFirebaseObjectToArray(action.data),
                isLoading: false
            }

        case equipmentActions.GETALL_ARROWS_ERROR:
            return {
                ...state,
                error: action.error,
                arrows: null,
                isLoading: false
            }

        case equipmentActions.GET_ARROWS_DEFAULT_REQUESTED:
            return {
                ...state,
                defaultArrows: null,
                isLoading: true
            }

        case equipmentActions.GET_ARROWS_DEFAULT_LOADED:
            return {
                ...state,
                defaultArrows: mapFirebaseObjectToArray(action.data)[0],
                isLoading: false
            }

        case equipmentActions.GET_ARROWS_DEFAULT_ERROR:
            return {
                ...state,
                error: action.error,
                defaultArrows: null,
                isLoading: false
            }

        case equipmentActions.DELETE_ARROWS_REQUESTED:
            return {
                ...state,
                isLoading: true
            }

        case equipmentActions.DELETE_ARROWS_LOADED:
            return {
                ...state,
                arrows: filterOutByKey(state.arrows, action.data.key),
                isLoading: false
            }

        case equipmentActions.DELETE_ARROWS_ERROR:
            return {
                ...state,
                error: action.error,
                arrows: null,
                isLoading: false
            }

        case equipmentActions.DELETE_BOW_REQUESTED:
            return {
                ...state,
                isLoading: true
            }

        case equipmentActions.DELETE_BOW_LOADED:
            return {
                ...state,
                bows: filterOutByKey(state.bows, action.data.key),
                isLoading: false
            }

        case equipmentActions.DELETE_BOW_ERROR:
            return {
                ...state,
                error: action.error,
                bows: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default equipment;