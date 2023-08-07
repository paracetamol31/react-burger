import PropTypes from "prop-types";

const urlRequestIngredients = "https://norma.nomoreparties.space/api/ingredients";

export const RequestStatusEnum = {
    Loading: "Loading",
    Success: "Success",
    Failed: "Failed"
}

const makeRequest = async (url) => {
    const response = await fetch(url);
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

export const responseIngredientsProps = PropTypes.shape({
    data: PropTypes.object,
    requestStatus: PropTypes.string.isRequired
});