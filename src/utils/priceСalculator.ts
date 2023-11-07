import { IIngredientItem } from "../services/reducers/ingredients";

export interface IGroupedListPricesItem {
    count: number,
    price: number
}

export const getTotalCount = (ingredientsId: Array<string>, allIngredients: Map<string, IIngredientItem>): number => {
    let count: number = 0;
    for (const ingredientId of ingredientsId) {
        const ingredient = allIngredients.get(ingredientId);
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

export const getGroupedListPrices = (ingredients: Array<string>, allIngredients: Map<string, IIngredientItem>) => {
    const copyIngredients: Array<string> = Array.from(ingredients);
    let result: Map<string, IGroupedListPricesItem> = new Map();

    for (let i = 0; i < copyIngredients.length; i++) {
        const ingredientId: string = copyIngredients[i];
        let count: number = 1;
        const ingredient: IIngredientItem | undefined = allIngredients.get(ingredientId);
        if (!ingredient || ingredient.price === undefined || !ingredient.type) {
            result = new Map([["NaN", { count: 0, price: 0 }]]);
            break;
        }

        for (let j = i + 1; j < copyIngredients.length; j++) {
            if (copyIngredients[j] === ingredientId) {
                count++;
                copyIngredients.splice(j, 1);
                j--;
            }
        }

        if (ingredient.type === "bun") {
            count *= 2;
        }

        result.set(ingredientId, { count: count, price: ingredient.price })
    }

    return result;
}