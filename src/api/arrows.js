import { getCall } from './common'

const fakeGetDefaultSet = () => {
    let promise = Promise.resolve({
        json: () => {
            return { name: "x10 best set arrows ever", labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] }
        }
    });

    return promise;
}

const GetAll = () => {
    return getCall(window.env.api + '/api/arrows/');
}

const GetDefaultSet = () => {
    return fakeGetDefaultSet();
    // return getCall(window.env.api + '/api/arrows?default=true');
}
export default { GetAll, GetDefaultSet };