export interface IFetchDataParams {
    url: string;
    params?: RequestInit;
};

export interface IFetchDataResult {
    success?: boolean;
    hasError?: boolean;
};

const fetchData: <T = IFetchDataResult>(props: IFetchDataParams) => Promise<T> = async ({ url, params = {} }) => {
    try {
        const response = await fetch(url, {
            ...params,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(String(response.status));
        }

        return await response.json();

    } catch (e) {
        console.error(`Не удалось получить данные. Статус: ${e}`);
        return { hasError: true };
    }
}

export default fetchData;