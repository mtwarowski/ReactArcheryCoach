import decode from 'jwt-decode';
import { auth, provider } from './firebase.js';

class AuthService {

    constructor() {
        this.loginWithGoogle = this.loginWithGoogle.bind(this)
    }

    loginWithGoogle(){
        var loginPromise = Promise.resolve(


        auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setUserId(user.uid);
  
          user.getIdToken().then((token) => {
            this.setToken(token);
          });
          return result;       
        }));
        return loginPromise;
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }
    
    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }    
    
    setUserId(userId) {
        // Saves user to localStorage
        localStorage.setItem('uid_user', userId)
    }
    
    getUserId() {
        // Retrieves the user from localStorage
        return localStorage.getItem('uid_user')
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
}

export default AuthService;