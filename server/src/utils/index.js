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
export const transformCollectionToArray = (collection, sortKey = 'order', desc = false) => {
    if (!collection || typeof collection !== 'object' || Array.isArray(collection)) {
        return [];
    }

    const transformedArray = Object.keys(collection).map(key => ({
        key: key,
        ...collection[key]
    }));

    if (sortKey) {
        transformedArray.sort((a, b) => {
            const valA = a[sortKey] || Infinity; 
            const valB = b[sortKey] || Infinity;
            return desc ? valB - valA : valA - valB;
        });
    }

    return transformedArray;
};

/**
 * * @param {object} responseDetails - The response configuration object
 * @param {boolean} responseDetails.success - Whether or not the call was successful
 * @param {string} responseDetails.message - Short description of the response
 * @param {string} [responseDetails.error=null] - Error message string if present
 * @param {object} [responseDetails.data=null] - Data object if present
 * @returns - Returns response object.
 */
export const responseConstructor = ({ success, message = "Success", error = null, data = null }) => {
    return ({
        success, // Shorthand for success: success
        message,
        error,
        data
    });
};