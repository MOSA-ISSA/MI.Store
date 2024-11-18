import { fetchApi, stringify } from "./_fetchApi";

export const login = async (body) => {
    // console.log(body);
    const route = `/login`;
    return await fetchApi(route, 'POST', stringify(body))
}

export const createUser = async (body) => {
    // console.log(body);
    const route = `/createuser`;
    return await fetchApi(route, 'POST', stringify(body))
}