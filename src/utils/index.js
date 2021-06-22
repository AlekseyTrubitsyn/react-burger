export const calcCountsById = (arr) => {
    if (!(arr && Array.isArray(arr) && arr.length)) return {};

    const result = {};

    arr.forEach(id => {
        result[id] = (result[id] || 0) + 1;
    });

    return result;
};