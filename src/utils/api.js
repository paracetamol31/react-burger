import PropTypes from "prop-types";

const urlRequestIngredients = "https://norma.nomoreparties.space/api/ingredients";
const urlRequestMakeOrder = "https://norma.nomoreparties.space/api/orders";

export const RequestStatusEnum = {
    Loading: "Loading",
    Success: "Success",
    Failed: "Failed"
}

const makeRequest = async (url, method = "GET", body) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: method,
        body: body
    });
    if (!response.ok) {
        throw new Error("Ошибка запроса!");
    }
    return response;
}

export const makeRequestIngredients = async () => {
    try {
        const response = await makeRequest(urlRequestIngredients);
        const data = await response.json();
        return {
            data: data.data,
            requestStatus: RequestStatusEnum.Success
        };
    } catch {
        return {
            requestStatus: RequestStatusEnum.Failed
        };
    }
}

export const makeOrderRequest = async (idItems) => {
    try {
        const response = await makeRequest(
            urlRequestMakeOrder,
            "POST",
            JSON.stringify({
                ingredients: idItems.map(item => item._id)
            })
        );
        const data = await response.json();
        return {
            data: data,
            requestStatus: RequestStatusEnum.Success
        };
    } catch {
        return {
            requestStatus: RequestStatusEnum.Failed
        };
    }
}

export const responseIngredientsProps = PropTypes.shape({
    data: PropTypes.object,
    requestStatus: PropTypes.string.isRequired
});