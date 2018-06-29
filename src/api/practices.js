import { getCall, deleteCall, postCall } from './common'

import { mapFirebaseObjectToArray } from '../helpers/dataMapping';

import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

const getUserId = () => new AuthService().getUserId();


const fakeGetPage = (pageNumber, pageSize) => {
    let promise = Promise.resolve({
        json: () => {
            return {
                pageNumber: pageNumber,
                pageSize: pageSize,
                itemCount: pageNumber * pageSize * 10,
                data: fakePractices(pageSize, pageNumber)
            };
        }
    });

    return promise;
}

const fakePractices = (quantity, pageNumber) => {
    var data = [];
    for (let indexNo = 1; indexNo <= quantity; indexNo++) {
        data.push({
            id: indexNo,
            name: 'Practice no ' + indexNo,
            totalValue: 100 * pageNumber,
            practiceDateTimeStamp: 1000 * indexedDB
        });
    }
    return data;
}

const GetPage = (pageNumber, pageSize) => {

    return database.ref('userData/' + getUserId()).child("practices").once("value").then(snapshot => {

        const numberOfItems = snapshot.numChildren();

        let at = numberOfItems - (pageNumber * (pageSize + 1));

        return database.ref('userData/' + getUserId() + '/practices').orderByChild('practiceDateTimeStamp').endAt(at).limitToLast(pageSize).once('value')
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

    //return fakeGetPage(pageNumber, pageSize);    

    //return getCall(`${window.env.api}/api/practices/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const Delete = (practiceId) => {
    return Promise.resolve({
        json: () => {
            return { practiceId: practiceId };
        }
    });
    //return deleteCall(`${window.env.api}/api/practices/${practiceId}`);
}


const Create = (practice) => {
    return Promise.resolve({
        json: () => {
            return { practice: practice };
        }
    });
    //return postCall(`${window.env.api}/api/practices/${practiceId}`, practice);
}


export default { GetPage, Delete, Create };