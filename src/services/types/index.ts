import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { TAuthorizationInputFieldsActions } from "../actions/authorizationInputFields";
import { THeaderActions } from "../actions/header";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TRoutingActions } from "../actions/routing";
import { TTotalPriceActions } from "../actions/totalPrice";
import { TUserActions } from "../actions/user";
import { TProfileActions } from "../actions/profile";
import { store } from "../store";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import {
    TWsOrderFeedSendMessageActions,
    WS_ORDER_FEED_CONNECTION_CLOSED,
    WS_ORDER_FEED_CONNECTION_ERROR,
    WS_ORDER_FEED_CONNECTION_START,
    WS_ORDER_FEED_CONNECTION_SUCCESS,
    WS_ORDER_FEED_GET_MESSAGE,
    WS_ORDER_FEED_SEND_MESSAGE
} from "../actions/orderFeed";
import {
    TWsOrderHistorySendMessageActions,
    WS_ORDER_HISTORY_CONNECTION_CLOSED,
    WS_ORDER_HISTORY_CONNECTION_ERROR,
    WS_ORDER_HISTORY_CONNECTION_START,
    WS_ORDER_HISTORY_CONNECTION_SUCCESS,
    WS_ORDER_HISTORY_GET_MESSAGE,
    WS_ORDER_HISTORY_SEND_MESSAGE
} from "../actions/orderHistory";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
    TAuthorizationInputFieldsActions
    | TBurgerConstructorActions
    | THeaderActions
    | TIngredientsActions
    | TOrderActions
    | TRoutingActions
    | TTotalPriceActions
    | TUserActions
    | TWsOrderFeedSendMessageActions
    | TWsOrderHistorySendMessageActions
    | TProfileActions;

export type TWSStoreActions = {
    wsInit: typeof WS_ORDER_FEED_CONNECTION_START | typeof WS_ORDER_HISTORY_CONNECTION_START,
    wsSendMessage: typeof WS_ORDER_FEED_SEND_MESSAGE | typeof WS_ORDER_HISTORY_SEND_MESSAGE,
    onOpen: typeof WS_ORDER_FEED_CONNECTION_SUCCESS | typeof WS_ORDER_HISTORY_CONNECTION_SUCCESS,
    onClose: typeof WS_ORDER_FEED_CONNECTION_CLOSED | typeof WS_ORDER_HISTORY_CONNECTION_CLOSED,
    onError: typeof WS_ORDER_FEED_CONNECTION_ERROR | typeof WS_ORDER_HISTORY_CONNECTION_ERROR,
    onMessage: typeof WS_ORDER_FEED_GET_MESSAGE | typeof WS_ORDER_HISTORY_GET_MESSAGE
};

//Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

//Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>;