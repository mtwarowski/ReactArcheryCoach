const getHttpHeaders = () => {
    return {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
    };
}

export const getCall = (url) => {
    let headers = getHttpHeaders();
    return fetch(url, headers);
}


export const deleteCall = (url) => {
    let headers = getHttpHeaders();
    return fetch(url, {...headers, method: 'delete' });
}

export const postCall = (url, body) => {
    let headers = getHttpHeaders();
    return fetch(url, {...headers, method: 'post', body: body });
}
