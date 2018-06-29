import { get } from './common'

const fakeTargetFacesData = () => {
    return [{ name: "target face 1", id: 1 }, { name: "target face 2", id: 2 }, { name: "target face 3", id: 3 }];
}

const fakeGetAll = () => {
    let promise = Promise.resolve({
        json: () => {
            return fakeTargetFacesData();
        }
    });

    return promise;
}


const fakeGet = (id) => {
    let promise = Promise.resolve({
        json: () => {
            return {
                name: "Face of Id" + id,
                paper: {
                    x: -10,
                    y: -10,
                    width: 1020,
                    height: 1020,
                },
                targets: [
                    [
                        { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 998 / 2, displayValue: '1', value: 1 },
                        { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 898 / 2, displayValue: '2', value: 2 },
                        { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 798 / 2, displayValue: '3', value: 3 },
                        { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 500, radius: 698 / 2, displayValue: '4', value: 4 },
                        { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 500, radius: 598 / 2, displayValue: '5', value: 5 },
                        { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 498 / 2, displayValue: '6', value: 6 },
                        { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 398 / 2, displayValue: '7', value: 7 },
                        { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 298 / 2, displayValue: '8', value: 8 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 198 / 2, displayValue: '9', value: 9 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 2, displayValue: '10', value: 10 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 500, radius: 98 / 4, displayValue: 'X', value: 10 },
                    ],

                    [
                        { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 998 / 2, displayValue: '1', value: 1 },
                        { backgroundColor: 'white', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 898 / 2, displayValue: '2', value: 2 },
                        { backgroundColor: 'black', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 798 / 2, displayValue: '3', value: 3 },
                        { backgroundColor: 'black', lineColour: 'white', lineWidth: 2, xPos: 500, yPos: 1500, radius: 698 / 2, displayValue: '4', value: 4 },
                        { backgroundColor: 'blue', lineColour: 'blue', lineWidth: 2, xPos: 500, yPos: 1500, radius: 598 / 2, displayValue: '5', value: 5 },
                        { backgroundColor: 'blue', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 498 / 2, displayValue: '6', value: 6 },
                        { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 398 / 2, displayValue: '7', value: 7 },
                        { backgroundColor: 'red', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 298 / 2, displayValue: '8', value: 8 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 198 / 2, displayValue: '9', value: 9 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 2, displayValue: '10', value: 10 },
                        { backgroundColor: 'yellow', lineColour: 'black', lineWidth: 2, xPos: 500, yPos: 1500, radius: 98 / 4, displayValue: 'X', value: 10 },
                    ]
                ]
            };
        }
    });

    return promise;
}

const GetAll = () => {
    // return get(window.env.api + '/api/targetFaces');
    return fakeGetAll();
}

const GetDetails = (id) => {
    // return get(window.env.api + '/api/targetFaces/' + name);
    return fakeGet(id);
}

export default { GetAll, GetDetails };