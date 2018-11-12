import practicesApi from '../api/practices'
import { dispatchFirebaseAsync, dispatchFirebaseSaveAsync } from './common'
import { navigateTo } from '../helpers/navigation'

export const GETPAGE_PRACTICES_REQUESTED = 'practices/GETPAGE_REQUESTED'
export const GETPAGE_PRACTICES_LOADED = 'practices/GETPAGE_LOADED'
export const GETPAGE_PRACTICES_ERROR = 'practices/GETPAGE_ERRORAD'

export const GET_PRACTICE_BYDATE_REQUESTED = 'practices/GET_PRACTICE_BYDATE_REQUESTED'
export const GET_PRACTICE_BYDATE_LOADED = 'practices/GET_PRACTICE_BYDATE_LOADED'
export const GET_PRACTICE_BYDATE_ERROR = 'practices/GET_PRACTICE_BYDATE_ERROR'

export const ADD_PRACTICES_REQUESTED = 'practices/ADD_REQUESTED'
export const ADD_PRACTICES_LOADED = 'practices/ADD_LOADED'
export const ADD_PRACTICES_ERROR = 'practices/ADD_ERRORPAGE'

export const DELETE_PRACTICES_REQUESTED = 'practices/DELETE_REQUESTED'
export const DELETE_PRACTICES_LOADED = 'practices/DELETE_LOADED'
export const DELETE_PRACTICES_ERROR = 'practices/DELETE_ERRORPAGE'

export const loadPracticesPageAsync = ({pageNumber, pageSize}) => {
    return dispatchFirebaseAsync(() => practicesApi.GetPage(pageNumber, pageSize),
        {
            ON_REQUESTED_TYPE: GETPAGE_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: GETPAGE_PRACTICES_LOADED,
            ON_ERROR_TYPE: GETPAGE_PRACTICES_ERROR
        }        
    );
}

export const loadPracticeByDateAsync = (date) => {
    return dispatchFirebaseAsync(() => practicesApi.GetPracticeByDay(date),
        {
            ON_REQUESTED_TYPE: GET_PRACTICE_BYDATE_REQUESTED, 
            ON_LOADED_TYPE: GET_PRACTICE_BYDATE_LOADED, 
            ON_ERROR_TYPE: GET_PRACTICE_BYDATE_ERROR
        }        
    );
}


export const deletePracticeByIdAsync = (practiceId) => {
    return dispatchFirebaseAsync(() => practicesApi.Delete(practiceId),
        {
            ON_REQUESTED_TYPE: DELETE_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: DELETE_PRACTICES_LOADED, 
            ON_ERROR_TYPE: DELETE_PRACTICES_ERROR
        }
    );
}

export const addPracticeAsync = (practice) => {
    return dispatchFirebaseSaveAsync(() => practicesApi.Create(practice),
        {
            ON_REQUESTED_TYPE: ADD_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: ADD_PRACTICES_LOADED, 
            ON_ERROR_TYPE: ADD_PRACTICES_ERROR
        }, () => navigateTo('./practices')
     );
}