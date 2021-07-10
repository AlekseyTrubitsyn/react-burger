export const calcCountsById = (items) => {
    if (!(items && Array.isArray(items) && items.length)) return {};

    const result = {};

    items.forEach(item => {
        const id = item._id;

        if (!id) return;

        result[id] = (result[id] || 0) + 1;
    });

    return result;
};