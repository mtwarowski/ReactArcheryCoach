import { database } from '../Auth/firebase.js'
import { getUserId } from '../Auth/AuthService'
import { mapFirebaseObjectToArray } from '../helpers/dataMapping'

const GetAllTournamentRounds = () => {
    return database.ref('tournamentRounds').once('value');
}

const GetScore = (id) => {
    return database.ref('userData/' + getUserId() + '/scores/' + id).once('value');
}

const GetScoreByDay = (day) => {
    return database.ref('userData/' + getUserId() + '/scores').orderByChild('day').equalTo(day).once('value')
        .then((data) => {
            return Promise.resolve({
                    val: () =>  mapFirebaseObjectToArray(data.val())
                });
            }
        );
}

const GetAllScore = () => {
    return database.ref('userData/' + getUserId() + '/scores/').once('value');
}

const GetPage = (pageNumber, pageSize) => {
    return database.ref('userData/' + getUserId()).child("scores").once("value").then(snapshot => {

        const numberOfItems = snapshot.numChildren();

        let at = (pageSize * pageNumber) - pageSize + 1;
        return database.ref('userData/' + getUserId() + '/scores').orderByChild('timeStamp').startAt(at).limitToFirst(pageSize).once('value')
            .then((data) => {
                return Promise.resolve({
                    val: () => {
                        return {
                            itemCount: numberOfItems,
                            pageSize: pageSize,
                            pageNumber: pageNumber,
                            data: mapFirebaseObjectToArray(data.val())
                        };
                    }
                });
            });
    });
}

const Create = (score) => {
    return database.ref(`userData/${getUserId()}/scores/`).push(score);
}

const Update = (id, score) => {
    return database.ref(`userData/${getUserId()}/scores/${id}/`).set(score);
}

export default { GetAllTournamentRounds, Create, GetScore, GetAllScore, Update, GetPage, GetScoreByDay };