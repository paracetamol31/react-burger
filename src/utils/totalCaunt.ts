import { IIngredientItem } from "../services/reducers/ingredients";

export const getTotalCaunt = (ingredientsId: Array<string>, ingredients: Map<string, IIngredientItem>): number => {
    let count: number = 0;
    for (const ingredientId of ingredientsId) {
        const ingredient = ingredients.get(ingredientId);
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