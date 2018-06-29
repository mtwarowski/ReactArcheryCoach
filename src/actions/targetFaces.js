import targetFacesApi from '../api/targetFaces'
import { dispatchApiAsync } from './common'

export const GETALL_TARGETFACES_REQUESTED = 'targetFaces/GETALL_REQUESTED'
export const GETALL_TARGETFACES_LOADED = 'targetFaces/GETALL_LOADED'
export const GETALL_TARGETFACES_ERROR = 'targetFaces/GETALL_ERROR'

export const SELECT_TARGETFACE_REQUESTED = 'targetFaces/SELECT_REQUESTED'
export const SELECT_TARGETFACE_LOADED = 'targetFaces/SELECT_LOADED'
export const SELECT_TARGETFACE_ERROR = 'targetFaces/SELECT_ERROR'


export const loadTargetFacesAsync = () => {
    return dispatchApiAsync(() => targetFacesApi.GetAll(),
        {
            ON_REQUESTED_TYPE: GETALL_TARGETFACES_REQUESTED, 
            ON_LOADED_TYPE: GETALL_TARGETFACES_LOADED, 
            ON_ERROR_TYPE: GETALL_TARGETFACES_ERROR
        }        
    );
}

export const loadTargetFaceDetailsAsync = (id) => {
    return dispatchApiAsync(() => targetFacesApi.GetDetails(id),
        {
            ON_REQUESTED_TYPE: SELECT_TARGETFACE_REQUESTED, 
            ON_LOADED_TYPE: SELECT_TARGETFACE_LOADED, 
            ON_ERROR_TYPE: SELECT_TARGETFACE_ERROR
        }        
    );
}