// export const baseUrl = "http://localhost:2999" // dev localhost
// export const baseUrl = "http://192.168.1.29:2999" // dev local-port-host
export const baseUrl = "https://mi-store-server.vercel.app" // dev

export const fetchApi = async (route, method, body) => {
    const url = baseUrl + route;
    return await fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,

    }).then(res => res.json())
        .catch((error) => {
            console.error("fetch Error", error?.message);
        });
}

export const stringify = (body) => (JSON.stringify(body))


export const getHomeData = async (email, password) => {
    const route = `/getHomeData?password=${password}&email=${email}`;
    return await fetchApi(route, 'GET', null)
}