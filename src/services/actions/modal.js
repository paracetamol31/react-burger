export const SHOW_INGREDIENT_MODAL = "SHOW_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";

export const SHOW_ORDER_MODAL = "SHOW_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export const showIngredientModal = () => {
    return {
        type: SHOW_INGREDIENT_MODAL
    }
}

export const cloaeIngredientModal = () => {
    return {
        type: CLOSE_INGREDIENT_MODAL
    }
}

export const showOrderMoal = () => {
    return {
        type: SHOW_ORDER_MODAL
    }
}

export const closeOrderModal = () => {
    return {
        type: CLOSE_ORDER_MODAL
    }
}