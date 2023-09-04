import { combineReducers } from 'redux';

import { ingredientsReducer } from "./ingredients.js"
import { modalReducer } from "./modal";
import { orderReducer } from "./order.js";
import { burgerConstructorReducer } from "./burgerConstructor.js";
import { totalPrice } from "./totalPrice.js";
import { app } from "./app.js";

export const rootReducer = combineReducers({
    app: app,
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer,
    totalPrice: totalPrice
});