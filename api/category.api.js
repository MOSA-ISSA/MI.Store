import { fetchApi } from "./_fetchApi";

export const getAllCategories = async () => {
    const route = "/getAllCategories";
    return await fetchApi(route, 'GET', null)
}