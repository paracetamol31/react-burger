import { combineReducers } from 'redux';

import { ingredientsReducer } from "./ingredients.js"
import { orderReducer } from "./order.js";
import { burgerConstructorReducer } from "./burgerConstructor.js";
import { totalPrice } from "./totalPrice.js";
import { userReducer } from "./user.js";
import { authorizationInputFields } from "./authorizationInputFields.js";
import { headerReducer } from "./header.js";
import { routingReducer } from "./routing.js";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer,
    totalPrice: totalPrice,
    user: userReducer,
    authorizationInputFields: authorizationInputFields,
    header: headerReducer,
    routing: routingReducer
});