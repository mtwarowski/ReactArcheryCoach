import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

const getUserId = () => new AuthService().getUserId();

const GetAllTournamentRounds = () => {     
    return database.ref('rounds').once('value');
    // return Promise.resolve({
    //     val: () => {
    //         var array = [];
    //         for (let i = 0; i < 10; i++) {

    //             array.push({
    //                 name: "round " + i,
    //                 key: i
    //             });
    //         }

    //         return array;
    //     }
    // });
}

const Create = (score) => {
    return database.ref('userData/' + getUserId() + '/scores').push(score);
}

export default { GetAllTournamentRounds, Create };