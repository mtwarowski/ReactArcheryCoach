import { database } from '../Auth/firebase.js';
import { getUserId } from '../Auth/AuthService';
import { mapFirebaseObjectToArray } from '../helpers/dataMapping';

const GetPage = (pageNumber, pageSize) => {

    return database.ref('userData/' + getUserId()).child("practices").once("value").then(snapshot => {

        const numberOfItems = snapshot.numChildren();

        let at = (pageSize * pageNumber) - pageSize + 1;

        return database.ref('userData/' + getUserId() + '/practices').orderByChild("timeStamp").startAt(at).limitToFirst(pageSize).once('value')
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
        // return database.ref('userData/' + getUserId() + '/practices').orderByChild('timeStamp').startAt(at).limitToFirst(pageSize).once('value')
        //     .then((data) => {
        //         return Promise.resolve({
        //             val: () => {
        //                 return {
        //                     itemCount: numberOfItems,
        //                     pageSize: pageSize,
        //                     pageNumber: pageNumber,
        //                     data: mapFirebaseObjectToArray(data.val())
        //                 };
        //             }
        //         });
        //     });
    });
}

const GetPracticeByDay = (day) => {     
    return database.ref('userData/' + getUserId() + '/practices').orderByChild('day').equalTo(day).once('value')
        .then((data) => {
            return Promise.resolve({
                    val: () =>  mapFirebaseObjectToArray(data.val())
                });
            }
        );
}

const Delete = (practiceId) => {
    return database.ref(`userData/${getUserId()}/practices/${practiceId}`).remove().then(() => {
        return Promise.resolve({
            val: () => {
                return { practiceId: practiceId };
            }
        });
    });
}

const Create = (practice) => {
    return database.ref(`userData/${getUserId()}/practices/`).push(practice);
}

const Update = (id, practice) => {
    return database.ref(`userData/${getUserId()}/practices/${id}/`).set(practice);
}

export default { GetPage, Delete, Create, Update, GetPracticeByDay };