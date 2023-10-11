import { combineReducers } from 'redux';

import { orderReducer } from "./order";
import { burgerConstructorReducer } from "./burgerConstructor";
import { totalPrice } from "./totalPrice";
import { userReducer } from "./user";
import { authorizationInputFields } from "./authorizationInputFields";
import { headerReducer } from "./header";
import { routingReducer } from "./routing";
import { ingredientsReducer } from './ingredients';

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