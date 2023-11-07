import { IIngredientItem } from "../services/reducers/ingredients";

export const orderValidation = (order: IOrderShortInfo, ingredients: Map<string, IIngredientItem> | null): boolean => {
    if (!ingredients) {
        return false;
    }

    if (!order._id
        || !order.createdAt
        || !order.name
        || !order.ingredients
        || order.number < 0
        || Number.isNaN(order.name)
        || order.number < 0
        || !order.status
        || !order.updatedAt) {
        return false;
    }

    if (order.ingredients.some((ingredient: string) => !ingredients.has(ingredient))) {
        return false;
    }

    return true;
}