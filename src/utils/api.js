const BASE_URL = "https://norma.nomoreparties.space/api"
const urlRequestIngredients = `${BASE_URL}/ingredients`;
const urlRequestMakeOrder = `${BASE_URL}/orders`;

const makeRequest = async (url, method = "GET", body) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: method,
        body: body
    });
    if (!response.ok) {
        throw new Error("Ошибка запроса!");
    }
    return await response.json();
}

export const makeRequestIngredients = async () => {
    return makeRequest(urlRequestIngredients);
}

export const makeOrderRequest = async (idItems) => {
    return await makeRequest(
        urlRequestMakeOrder,
        "POST",
        JSON.stringify({
            ingredients: idItems.map(item => item)
        })
    );
}