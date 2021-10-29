type sumsObject = Record<string | number, number>;

export const calcCountsById = (items: Record<'_id', string | number>[]): sumsObject => {
    if (!(items && Array.isArray(items) && items.length)) return {};

    const result: sumsObject = {};

    items.forEach(item => {
        const id = item._id;

        if (!id) return;

        result[id] = (result[id] || 0) + 1;
    });

    return result;
};