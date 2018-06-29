

export const mapFirebaseObjectToArray = (entities) => {
    let newEntities = [];

    for (let key in entities) {
        let entity = entities[key];
        entity.id = key;
        newEntities.push(entity);
    }
    return newEntities;
}

export const filterOutByKey = (collection, key) => {
    if (!collection) {
        return collection;
    }

    return collection.filter((p) => p.id !== key);
}

export default {mapFirebaseObjectToArray, filterOutByKey};