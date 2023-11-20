import { testDataIngredients } from "../../tests/testsData/reducersTestData";
import {
    APPLY_INGREDIENTS_FAILED,
    APPLY_INGREDIENTS_REQUEST,
    APPLY_INGREDIENTS_SUCCESS,
    CLEAR_ALL_COUNTER,
    CLEAR_BUNS_COUNTER,
    CLEAR_CURRENT_INGREDIENT,
    INCREASE_COUNTER,
    REDUCE_COUNTER,
    SET_CATEGORY_INGREDIENTS,
    SET_CURRENT_INGREDIENT
} from "../actions/ingredients";
import {
    ingredientsReducer as reducer,
    initialState,
    IIngredientItem,
} from "./ingredients";

describe("Redex::ingredientsReducer", () => {
    test("APPLY_INGREDIENTS_REQUEST", () => {
        expect(reducer(initialState, { type: APPLY_INGREDIENTS_REQUEST })).toEqual({ ...initialState, ingredientsRequest: true });
    });

    test("APPLY_INGREDIENTS_SUCCESS", () => {
        const ingredients = new Map(testDataIngredients.map(ingredient => [ingredient._id, ingredient]));
        expect(reducer(initialState, {
            type: APPLY_INGREDIENTS_SUCCESS,
            payload: {
                ingredients
            }
        })).toEqual({ ...initialState, ingredients });
    });

    test("APPLY_INGREDIENTS_FAILED", () => {
        expect(reducer(initialState, { type: APPLY_INGREDIENTS_FAILED })).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true
        });
    });

    test("SET_CURRENT_INGREDIENT", () => {
        const currentIngredient = "id";
        expect(reducer(initialState, {
            type: SET_CURRENT_INGREDIENT,
            payload: { id: currentIngredient }
        })).toEqual({
            ...initialState,
            currentIngredient
        });
    });

    test("CLEAR_CURRENT_INGREDIENT", () => {
        expect(reducer(initialState, { type: CLEAR_CURRENT_INGREDIENT })).toEqual({ ...initialState, currentIngredient: null });
    });

    test("SET_CATEGORY_INGREDIENTS", () => {
        const currentCategory: number = 1;
        expect(reducer(initialState, {
            type: SET_CATEGORY_INGREDIENTS,
            payload: { value: currentCategory }
        })).toEqual({ ...initialState, currentCategory });
    });

    test("INCREASE_COUNTER", () => {
        const ingredients = new Map(testDataIngredients.map(ingredient => [ingredient._id, ingredient]));
        const createExpected = (id: string): Map<string, IIngredientItem> => {
            return new Map(Array.from(ingredients).map((item) => {
                return item[0] === id
                    ? item[1].type === "bun"
                        ? [item[0], { ...item[1], count: 2 }]
                        : [item[0], { ...item[1], count: item[1].count + 1 }]
                    : item
            }))
        }

        //Если тип не bun 
        let curerentId: string = "id1";
        let expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: INCREASE_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });

        //Если тип bun
        curerentId = "id3";
        expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: INCREASE_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });
    });

    test("REDUCE_COUNTER", () => {
        const ingredients = new Map(testDataIngredients.map(ingredient => [ingredient._id, ingredient]));
        const createExpected = (id: string): Map<string, IIngredientItem> => {
            return new Map(Array.from(ingredients).map((item) => {
                return item[0] === id
                    ? item[1].type === "bun"
                        ? [item[0], { ...item[1], count: 0 }]
                        : [item[0], { ...item[1], count: item[1].count - 1 }]
                    : item
            }))
        }

        //Если тип не bun 
        let curerentId: string = "id1";
        let expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: REDUCE_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });

        //Если тип bun
        curerentId = "id3";
        expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: REDUCE_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });
    });

    test("CLEAR_BUNS_COUNTER", () => {
        const ingredients = new Map(testDataIngredients.map(ingredient => [ingredient._id, ingredient]));
        const createExpected = (id: string): Map<string, IIngredientItem> => {
            return new Map(Array.from(ingredients).map((item) => {
                return item[1].type === "bun" && item[1]._id !== id
                    ? [item[0], { ...item[1], count: 0 }]
                    : item
            }))
        }

        //Если тип не bun 
        let curerentId: string = "id1";
        let expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: CLEAR_BUNS_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });

        //Если тип bun
        curerentId = "id3";
        expected = createExpected(curerentId);
        expect(reducer({ ...initialState, ingredients }, {
            type: CLEAR_BUNS_COUNTER,
            payload: {
                id: curerentId
            }
        })).toEqual({ ...initialState, ingredients: expected });
    });

    test("CLEAR_ALL_COUNTER", () => {
        const ingredients = new Map(testDataIngredients.map(ingredient => [ingredient._id, ingredient]));
        const expected: Map<string, IIngredientItem> = new Map(Array.from(ingredients).map((item) => {
            return [item[0], { ...item[1], count: 0 }];
        }));

        expect(reducer({ ...initialState, ingredients }, {
            type: CLEAR_ALL_COUNTER
        })).toEqual({ ...initialState, ingredients: expected });
    });
});