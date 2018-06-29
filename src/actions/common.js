export const dispatchApiAsync = (actionApiAsync, {ON_REQUESTED_TYPE, ON_LOADED_TYPE, ON_ERROR_TYPE}, callback) => {
    return dispatch => {
        dispatch({
            type: ON_REQUESTED_TYPE
        })

        return actionApiAsync()
            .then(response => response.json())
            .then(json => dispatch({
                type: ON_LOADED_TYPE,
                data: json
            }))
            .then(() => {
                if(callback && typeof callback === "function"){
                    callback();
                }
            })
            .catch(error => {
                dispatch({
                    type: ON_ERROR_TYPE,
                    error: error.message
                })
                console.log('There has been a problem with your fetch operation: ', error)
            })
    }
}

export const dispatchFirebaseAsync = (actionFirebaseAsync, {ON_REQUESTED_TYPE, ON_LOADED_TYPE, ON_ERROR_TYPE}, callback) => {
    return dispatch => {
        dispatch({
            type: ON_REQUESTED_TYPE
        })

        return actionFirebaseAsync()
            .then(response => response.val())
            .then(val => dispatch({
                type: ON_LOADED_TYPE,
                data: val
            }))
            .then((result) => {
                if(callback && typeof callback === "function"){
                    callback(result);
                }
            })
            .catch(error => {
                dispatch({
                    type: ON_ERROR_TYPE,
                    error: error.message
                })
                console.log('There has been a problem with your fetch operation: ', error)
            })
    }
}


export const dispatchFirebaseSaveAsync = (actionFirebaseAsync, {ON_REQUESTED_TYPE, ON_LOADED_TYPE, ON_ERROR_TYPE}, callback) => {
    return dispatch => {
        dispatch({
            type: ON_REQUESTED_TYPE
        })

        return actionFirebaseAsync()
            .then(response => response.key)
            .then(val => dispatch({
                type: ON_LOADED_TYPE,
                data: val
            }))
            .then((result) => {
                if(callback && typeof callback === "function"){
                    callback(result);
                }
            })
            .catch(error => {
                dispatch({
                    type: ON_ERROR_TYPE,
                    error: error.message
                })
                console.log('There has been a problem with your fetch operation: ', error)
            })
    }
}