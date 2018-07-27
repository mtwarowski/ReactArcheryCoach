import practicesApi from '../api/practices'
import { dispatchApiAsync, dispatchFirebaseAsync } from './common'

export const GETPAGE_PRACTICES_REQUESTED = 'practices/GETPAGE_REQUESTED'
export const GETPAGE_PRACTICES_LOADED = 'practices/GETPAGE_LOADED'
export const GETPAGE_PRACTICES_ERROR = 'practices/GETPAGE_ERRORAD'

export const ADD_PRACTICES_REQUESTED = 'practices/ADD_REQUESTED'
export const ADD_PRACTICES_LOADED = 'practices/ADD_LOADED'
export const ADD_PRACTICES_ERROR = 'practices/ADD_ERRORPAGE'

export const DELETE_PRACTICES_REQUESTED = 'practices/DELETE_REQUESTED'
export const DELETE_PRACTICES_LOADED = 'practices/DELETE_LOADED'
export const DELETE_PRACTICES_ERROR = 'practices/DELETE_ERRORPAGE'

// export const loadParacticesPageAsync = ({pageNumber, pageSize}) => {
//     return dispatchApiAsync(() => practicesApi.GetPage(pageNumber, pageSize),
//         {
//             ON_REQUESTED_TYPE: GETPAGE_PRACTICES_REQUESTED, 
//             ON_LOADED_TYPE: GETPAGE_PRACTICES_LOADED, 
//             ON_ERROR_TYPE: GETPAGE_PRACTICES_ERROR
//         }        
//     );
// }

export const loadPracticesPageAsync = ({pageNumber, pageSize}) => {
    return dispatchFirebaseAsync(() => practicesApi.GetPage(pageNumber, pageSize),
        {
            ON_REQUESTED_TYPE: GETPAGE_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: GETPAGE_PRACTICES_LOADED, 
            ON_ERROR_TYPE: GETPAGE_PRACTICES_ERROR
        }        
    );
}

export const deletePracticeByIdAsync = (practiceId) => {
    return dispatchApiAsync(() => practicesApi.Delete(practiceId),
        {
            ON_REQUESTED_TYPE: DELETE_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: DELETE_PRACTICES_LOADED, 
            ON_ERROR_TYPE: DELETE_PRACTICES_ERROR
        }
    );
}

export const addPracticeAsync = (practice) => {
    return dispatchApiAsync(() => practicesApi.Create(practice),
        {
            ON_REQUESTED_TYPE: DELETE_PRACTICES_REQUESTED, 
            ON_LOADED_TYPE: DELETE_PRACTICES_LOADED, 
            ON_ERROR_TYPE: DELETE_PRACTICES_ERROR
        },
        () => { 
            window.location.href = window.location.origin + '/practices';
        }
    );
}