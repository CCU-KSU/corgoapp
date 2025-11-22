/**
 * Helper function to remove fields where the value is null or undefined.
 * @param {object} data - The raw update data from the controller.
 */
export const cleanUpdateData = (data) => {
    return Object.keys(data).reduce((cleanData, key) => {
        const value = data[key];
        if (value !== null && typeof value !== "undefined") {
            cleanData[key] = value;
        }
        return cleanData;
    }, {});
};

/**
 * Helper function to transform an keyed object into a sorted array of objects
 * @param {object} collection 
 * @param {string} sortKey
 */
export const transformCollectionToArray = (collection, sortKey = 'order') => {
    if (!collection || typeof collection !== 'object' || Array.isArray(collection)) {
        return [];
    }

    const transformedArray = Object.keys(collection).map(key => ({
        key: key,
        ...collection[key]
    }));

    if (sortKey) {
        return transformedArray.sort((a, b) => {
            const valA = a[sortKey] || Infinity; 
            const valB = b[sortKey] || Infinity;
            return valA - valB;
        });
    }

    return transformedArray;
};