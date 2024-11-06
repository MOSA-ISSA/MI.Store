import { fetchApi } from "./fetchApi";

export const getAllProducts = async () => {
    const route = "/getAllProducts";
    return await fetchApi(route, 'GET', null)
}

export const getOneProduct = async (_id) => {
    const route = `/getOneProduct?_id=${_id}`;
    return await fetchApi(route, 'GET', null)
}