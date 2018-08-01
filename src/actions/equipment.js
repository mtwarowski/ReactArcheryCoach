import equipmentApi from '../api/equipment'
import { dispatchFirebaseAsync } from './common'

export const GET_BOWS_DEFAULT_REQUESTED = 'equipment/bows/GETDEFAULT_REQUESTED'
export const GET_BOWS_DEFAULT_LOADED = 'equipment/bows/GETDEFAULT_LOADED'
export const GET_BOWS_DEFAULT_ERROR = 'equipment/bows/GETDEFAULT_ERROR'

export const GETALL_BOWS_REQUESTED = 'equipment/bows/GETALL_REQUESTED'
export const GETALL_BOWS_LOADED = 'equipment/bows/GETALL_LOADED'
export const GETALL_BOWS_ERROR = 'equipment/bows/GETBOWROR'

export const DELETE_BOW_REQUESTED = 'equipment/bow/DELETE_REQUESTED'
export const DELETE_BOW_LOADED = 'equipment/bow/DELETE_LOADED'
export const DELETE_BOW_ERROR = 'equipment/bow/DELETE_ERROR'

export const GET_ARROWS_DEFAULT_REQUESTED = 'equipment/arrows/GETDEFAULT_REQUESTED'
export const GET_ARROWS_DEFAULT_LOADED = 'equipment/arrows/GETDEFAULT_LOADED'
export const GET_ARROWS_DEFAULT_ERROR = 'equipment/arrows/GETDEFAULT_ERROR'

export const GETALL_ARROWS_REQUESTED = 'equipment/arrows/GETALL_REQUESTED'
export const GETALL_ARROWS_LOADED = 'equipment/arrows/GETALL_LOADED'
export const GETALL_ARROWS_ERROR = 'equipment/arrows/GETALL_ERROR'

export const DELETE_ARROWS_REQUESTED = 'equipment/arrows/DELETE_REQUESTED'
export const DELETE_ARROWS_LOADED = 'equipment/arrows/DELETE_LOADED'
export const DELETE_ARROWS_ERROR = 'equipment/arrows/DELETE_ERROR'

export const loadDefaultBowAsync = () => {
    return dispatchFirebaseAsync(() => equipmentApi.GetDefaultBow(),
        {
            ON_REQUESTED_TYPE: GET_BOWS_DEFAULT_REQUESTED,
            ON_LOADED_TYPE: GET_BOWS_DEFAULT_LOADED,
            ON_ERROR_TYPE: GET_BOWS_DEFAULT_ERROR
        });
}


export const loadBowsAsync = () => {
    return dispatchFirebaseAsync(() => equipmentApi.GetBows(),
        {
            ON_REQUESTED_TYPE: GETALL_BOWS_REQUESTED,
            ON_LOADED_TYPE: GETALL_BOWS_LOADED,
            ON_ERROR_TYPE: GETALL_BOWS_ERROR
        });
}

export const deleteBowByIdAsync = (key) => {
    return dispatchFirebaseAsync(() => equipmentApi.DeleteBow(key),
        {
            ON_REQUESTED_TYPE: DELETE_BOW_REQUESTED, 
            ON_LOADED_TYPE: DELETE_BOW_LOADED, 
            ON_ERROR_TYPE: DELETE_BOW_ERROR
        }
    );
}

export const loadDefaultArrowsAsync = () => {
    return dispatchFirebaseAsync(() => equipmentApi.GetDefaultArrows(),
        {
            ON_REQUESTED_TYPE: GET_ARROWS_DEFAULT_REQUESTED,
            ON_LOADED_TYPE: GET_ARROWS_DEFAULT_LOADED,
            ON_ERROR_TYPE: GET_ARROWS_DEFAULT_ERROR
        }
    );   
}

export const loadArrowsAsync = () => {
    return dispatchFirebaseAsync(() => equipmentApi.GetArrows(),
        {
            ON_REQUESTED_TYPE: GETALL_ARROWS_REQUESTED,
            ON_LOADED_TYPE: GETALL_ARROWS_LOADED,
            ON_ERROR_TYPE: GETALL_ARROWS_ERROR
        }
    );
}

export const deleteArrowsByIdAsync = (key) => {
    return dispatchFirebaseAsync(() => equipmentApi.DeleteArrows(key),
        {
            ON_REQUESTED_TYPE: DELETE_ARROWS_REQUESTED, 
            ON_LOADED_TYPE: DELETE_ARROWS_LOADED, 
            ON_ERROR_TYPE: DELETE_ARROWS_ERROR
        }
    );    
}
