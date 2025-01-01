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

export const activateUser = async (body) => {
    const route = `/activateUser`;
    return await fetchApi(route, 'PATCH', stringify(body))
}

export const sendVerification = async (body) => {
    const route = `/sendVerification`;
    return await fetchApi(route, 'POST', stringify(body))
}