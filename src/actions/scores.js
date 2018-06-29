import scoresApi from '../api/scores'
import { dispatchFirebaseAsync, dispatchFirebaseSaveAsync } from './common'

export const GETALL_TOURNAMENTROUNDS_REQUESTED = 'tournamentRounds/GETALL_REQUESTED'
export const GETALL_TOURNAMENTROUNDS_LOADED = 'tournamentRounds/GETALL_LOADED'
export const GETALL_TOURNAMENTROUNDS_ERROR = 'tournamentRounds/GETALL_ERROR'

export const CREATE_SCORES_REQUESTED = 'SCORES/CREATE_REQUESTED'
export const CREATE_SCORES_LOADED = 'SCORES/CREATE_LOADED'
export const CREATE_SCORES_ERROR = 'SCORES/CREATE_ERROR'

export const loadTournamentRoundsAsync = () => {
    return dispatchFirebaseAsync(() => scoresApi.GetAllTournamentRounds(),
        {
            ON_REQUESTED_TYPE: GETALL_TOURNAMENTROUNDS_REQUESTED, 
            ON_LOADED_TYPE: GETALL_TOURNAMENTROUNDS_LOADED, 
            ON_ERROR_TYPE: GETALL_TOURNAMENTROUNDS_ERROR
        }        
    );
}

export const addScoreAsync = (score) => {
    return dispatchFirebaseSaveAsync(() => scoresApi.Create(score),
        {
            ON_REQUESTED_TYPE: CREATE_SCORES_REQUESTED, 
            ON_LOADED_TYPE: CREATE_SCORES_LOADED, 
            ON_ERROR_TYPE: CREATE_SCORES_ERROR
        },
        (result) => { 
            window.location.href = window.location.origin + '/scores/' + result.data;
        }     
    );
}

// export const updateScoreAsync = (key, score) => {
//     return dispatchApiAsync(() => scoresApi.Create(score),
//         {
//             ON_REQUESTED_TYPE: CREATE_SCORES_REQUESTED, 
//             ON_LOADED_TYPE: CREATE_SCORES_LOADED, 
//             ON_ERROR_TYPE: CREATE_SCORES_ERROR
//         }         
//     );
// }

export default {loadTournamentRoundsAsync, addScoreAsync};