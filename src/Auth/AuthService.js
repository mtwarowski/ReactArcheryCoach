import decode from 'jwt-decode';
import { auth, provider } from './firebase.js';

export const isLoggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken() // GEtting token from localstorage
    return !!token && !isTokenExpired(token) // handwaiving here
}

export const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
}

export const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return true;
    }
}

export const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
}

export const loginWithGoogle = () => {
    var loginPromise = Promise.resolve(


        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setUserId(user.uid);

                user.getIdToken().then((token) => {
                    setToken(token);
                });
                return result;
            }));
    return loginPromise;
}

export const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}

export const setUserId = (userId) => {
    // Saves user to localStorage
    localStorage.setItem('uid_user', userId)
}

export const getUserId = () => {
    // Retrieves the user from localStorage
    return localStorage.getItem('uid_user')
}