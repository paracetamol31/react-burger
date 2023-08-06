import PropTypes from "prop-types";

const urlRequestIngredients = "https://norma.nomoreparties.space/api/ingredients";

export const RequestStatusEnum  = {
    Loading: "Loading",
    Success: "Success",
    Failed: "Failed"
}

export const makeRequestIngredients = async () => {
    try {
        const response = await fetch(urlRequestIngredients);
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