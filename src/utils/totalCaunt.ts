import { IIngredientItem } from "../services/reducers/ingredients";

export const getTotalCaunt = (ingredientsId: Array<string>, ingredients: Array<IIngredientItem>): number => {
    let count: number = 0;
    for (const ingredientId of ingredientsId) {
        const ingredient = ingredients.find((item: IIngredientItem) => item._id === ingredientId);
        if (!ingredient) {
            continue;
        }

        if (ingredient.type === "bun") {
            count += ingredient.price * 2;
        } else {
            count += ingredient.price;
        }
    }

    return count;
}