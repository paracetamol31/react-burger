import { IIngredientItem } from "../services/reducers/ingredients";

export interface IGroupedListPricesItem {
    count: number,
    price: number
}

export const getTotalCount = (ingredientsId: Array<string>, allIngredients: Map<string, IIngredientItem>): number => {
    const copyIngredientsId: Array<string> = Array.from(ingredientsId);
    let count: number = 0;

    for (let i = 0; i < copyIngredientsId.length; i++) {
        const ingredientId: string = copyIngredientsId[i];
        const ingredient: IIngredientItem | undefined = allIngredients.get(ingredientId);
        if (!ingredient) {
            continue;
        }

        if (ingredient.type === "bun") {
            count += ingredient.price * 2;
            for (let j = i + 1; j < copyIngredientsId.length; j++) {
                if (copyIngredientsId[j] === ingredientId) {
                    count++;
                    copyIngredientsId.splice(j, 1);
                    j--;
                }
            }
        } else {
            count += ingredient.price;
        }
    }

    return count;
}

export const getGroupedListPrices = (ingredientsId: Array<string>, allIngredients: Map<string, IIngredientItem>) => {
    const copyIngredientsId: Array<string> = Array.from(ingredientsId);
    let result: Map<string, IGroupedListPricesItem> = new Map();

    for (let i = 0; i < copyIngredientsId.length; i++) {
        const ingredientId: string = copyIngredientsId[i];
        let count: number = 1;
        const ingredient: IIngredientItem | undefined = allIngredients.get(ingredientId);
        if (!ingredient || ingredient.price === undefined || !ingredient.type) {
            result = new Map([["NaN", { count: 0, price: 0 }]]);
            break;
        }

        for (let j = i + 1; j < copyIngredientsId.length; j++) {
            if (copyIngredientsId[j] === ingredientId) {
                count++;
                copyIngredientsId.splice(j, 1);
                j--;
            }
        }

        if (ingredient.type === "bun") {
            count = 2;
        }

        result.set(ingredientId, { count: count, price: ingredient.price })
    }

    return result;
}