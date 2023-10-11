import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { TAuthorizationInputFieldsActions } from "../actions/authorizationInputFields";
import { THeaderActions } from "../actions/header";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TRoutingActions } from "../actions/routing";
import { TTotalPriceActions } from "../actions/totalPrice";
import { TUserActions } from "../actions/user";
import { store } from "../store";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
    TAuthorizationInputFieldsActions
    | TBurgerConstructorActions
    | THeaderActions
    | TIngredientsActions
    | TOrderActions
    | TRoutingActions
    | TTotalPriceActions
    | TUserActions;

//Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

//Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>;