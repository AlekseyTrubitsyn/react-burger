const fetchData = async ({ url, params = {} }) => {
    try {
        const response = await fetch(url, params);

        if (!response.ok) {
            throw new Error(response.status)
        }

        return await response.json();

    } catch (e) {
        console.error(`Не удалось получить данные. Статус: ${e}`);
        return {};
    }
}

export default fetchData;