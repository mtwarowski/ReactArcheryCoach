import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

const getUserId = () => new AuthService().getUserId();

const GetAllTournamentRounds = () => {     
    return database.ref('rounds').once('value');
}

const GetScore = (id) => {     
    return database.ref('userData/' + getUserId() + '/scores/' + id).once('value');
}

const GetAllScore = () => {     
    return database.ref('userData/' + getUserId() + '/scores/').once('value');
}

const Create = (score) => {
    return database.ref('userData/' + getUserId() + '/scores').push(score);
}

const Update = (id, score) => {
    return database.ref('userData/' + getUserId() + '/scores').set(score);
}

export default { GetAllTournamentRounds, Create, GetScore, GetAllScore, Update };