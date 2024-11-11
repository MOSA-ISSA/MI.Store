import { fetchApi } from "./_fetchApi";

export const getAllProducts = async (body) => {
    const query = Object.entries(body).map(([key, value]) => `${key}=${value}`).join('&');
    const route = `/getAllProducts${query ? `?${query}` : ''}`;
    console.log(route);
    
    return await fetchApi(route, 'GET', null)
}

export const getOneProduct = async (_id) => {
    const route = `/getOneProduct?_id=${_id}`;
    return await fetchApi(route, 'GET', null)
}

export const searchProducts = async (query) => {
    const route = `/searchProducts?query=${query||''}`;
    console.log(route);
    return await fetchApi(route, 'GET', null)
}