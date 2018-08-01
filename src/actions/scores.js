import scoresApi from '../api/scores'
import { dispatchFirebaseAsync, dispatchFirebaseSaveAsync } from './common'
import { getCurrentTournamentRoundScore } from '../helpers/points'
import { navigateTo } from '../helpers/navigation'

export const GETALL_TOURNAMENTROUNDS_REQUESTED = 'tournamentRounds/GETALL_REQUESTED'
export const GETALL_TOURNAMENTROUNDS_LOADED = 'tournamentRounds/GETALL_LOADED'
export const GETALL_TOURNAMENTROUNDS_ERROR = 'tournamentRounds/GETALL_ERROR'

export const GET_SCOREDETAILS_REQUESTED = 'SCORES/GET_SCOREDETAILS_REQUESTED'
export const GET_SCOREDETAILS_LOADED = 'SCORES/GET_SCOREDETAILS_LOADED'
export const GET_SCOREDETAILS_ERROR = 'SCORES/GET_SCOREDETAILS_ERROR'

export const CREATE_SCORES_REQUESTED = 'SCORES/CREATE_REQUESTED'
export const CREATE_SCORES_LOADED = 'SCORES/CREATE_LOADED'
export const CREATE_SCORES_ERROR = 'SCORES/CREATE_ERROR'

export const UPDATE_SCORES_REQUESTED = 'SCORES/UPDATE_REQUESTED'
export const UPDATE_SCORES_LOADED = 'SCORES/UPDATE_LOADED'
export const UPDATE_SCORES_ERROR = 'SCORES/UPDATE_ERROR'

export const GETALL_SCORES_REQUESTED = 'SCORES/GETALL_REQUESTED'
export const GETALL_SCORES_LOADED = 'SCORES/GETALL_LOADED'
export const GETALL_SCORES_ERROR = 'SCORES/GETALL_ERROR'

export const GETPAGE_SCORES_REQUESTED = 'SCORES/GETPAGE_REQUESTED'
export const GETPAGE_SCORES_LOADED = 'SCORES/GETPAGE_LOADED'
export const GETPAGE_SCORES_ERROR = 'SCORES/GETPAGE_ERROR'


export const loadTournamentRoundsAsync = () => {
    return dispatchFirebaseAsync(() => scoresApi.GetAllTournamentRounds(),
        {
            ON_REQUESTED_TYPE: GETALL_TOURNAMENTROUNDS_REQUESTED, 
            ON_LOADED_TYPE: GETALL_TOURNAMENTROUNDS_LOADED, 
            ON_ERROR_TYPE: GETALL_TOURNAMENTROUNDS_ERROR
        }        
    );
}

export const loadScoreByIdAsync = (id) => {
    return dispatchFirebaseAsync(() => scoresApi.GetScore(id),
        {
            ON_REQUESTED_TYPE: GET_SCOREDETAILS_REQUESTED, 
            ON_LOADED_TYPE: GET_SCOREDETAILS_LOADED, 
            ON_ERROR_TYPE: GET_SCOREDETAILS_ERROR
        }        
    );
}

export const loadScoresPageAsync = (pageInfo) => {
    return dispatchFirebaseAsync(() => scoresApi.GetPage(pageInfo.pageNumber, pageInfo.pageSize),
        {
            ON_REQUESTED_TYPE: GETPAGE_SCORES_REQUESTED, 
            ON_LOADED_TYPE: GETPAGE_SCORES_LOADED,
            ON_ERROR_TYPE: GETPAGE_SCORES_ERROR
        }        
    );
}

export const addScoreAsync = (score) => {
    score.currentValue = getCurrentTournamentRoundScore(score.results);
    return dispatchFirebaseSaveAsync(() => scoresApi.Create(score),
        {
            ON_REQUESTED_TYPE: CREATE_SCORES_REQUESTED, 
            ON_LOADED_TYPE: CREATE_SCORES_LOADED, 
            ON_ERROR_TYPE: CREATE_SCORES_ERROR
        },
        (result) =>{
            navigateTo(`./scores/${result.data}`);
        }  
    );
}

export const updateScoreAsync = (id, score) => {
    score.currentValue = getCurrentTournamentRoundScore(score.results);
    return dispatchFirebaseAsync(() => scoresApi.Update(id, score),
        {
            ON_REQUESTED_TYPE: UPDATE_SCORES_REQUESTED, 
            ON_LOADED_TYPE: UPDATE_SCORES_LOADED,
            ON_ERROR_TYPE: UPDATE_SCORES_ERROR
        }
    );
}

export default {loadTournamentRoundsAsync, addScoreAsync, loadScoresPageAsync, updateScoreAsync};