
import { database } from '../Auth/firebase.js';
import { getUserId } from '../Auth/AuthService';


export const GetArrows = () => {
    return database.ref('userData/' + getUserId() + '/arrows').once('value');
}

export const GetDefaultArrows = () => {
    return database.ref('userData/' + getUserId() + '/arrows').limitToLast(1).once('value');
}

export const DeleteArrows = (key) => {
    return database.ref('userData/' + getUserId() + '/arrows/' + key).remove().then(() => Promise.resolve({
        val: () => { return { key: key } }
    }));
}

export const GetBows = () => {
    return database.ref('userData/' + getUserId() + '/bows').once('value');    
}

export const GetDefaultBow = () => {
    return database.ref('userData/' + getUserId() + '/bows').limitToLast(1).once('value');
}

export const DeleteBow = (key) => {
    return database.ref('userData/' + getUserId() + '/bows/' + key).remove().then(() => Promise.resolve({
        val: () => { return { key: key } }
    }));
}

export default { GetArrows, GetBows, GetDefaultArrows, GetDefaultBow, DeleteArrows, DeleteBow,  };