import { combineReducers } from 'redux';

import { ingredientsReducer } from "./ingredients.js"
import { modalReducer } from "./modal";
import { orderReducer } from "./order.js";
import { burgerConstructorReducer } from "./burgerConstructor.js";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer
});