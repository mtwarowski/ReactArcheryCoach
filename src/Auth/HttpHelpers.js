class HttpHelpers {
    static getHttpHeaders() {
        return {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
        };
    }
}
export default HttpHelpers;