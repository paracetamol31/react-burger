import {
    applyMiddleware,
    compose,
    createStore
} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";
import {
    WSPathOrders,
    WSPathOrdersAll,
    socketMiddleware
} from "../middleware";
import {
    WS_ORDER_FEED_CONNECTION_CLOSED,
    WS_ORDER_FEED_CONNECTION_ERROR,
    WS_ORDER_FEED_CONNECTION_START,
    WS_ORDER_FEED_CONNECTION_SUCCESS,
    WS_ORDER_FEED_GET_MESSAGE,
    WS_ORDER_FEED_SEND_MESSAGE
} from "../actions/orderFeed";
import {
    WS_ORDER_HISTORY_CONNECTION_CLOSED,
    WS_ORDER_HISTORY_CONNECTION_ERROR,
    WS_ORDER_HISTORY_CONNECTION_START,
    WS_ORDER_HISTORY_CONNECTION_SUCCESS,
    WS_ORDER_HISTORY_GET_MESSAGE,
    WS_ORDER_HISTORY_SEND_MESSAGE
} from "../actions/orderHistory";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(WSPathOrdersAll,
        {
            wsInit: WS_ORDER_FEED_CONNECTION_START,
            onClose: WS_ORDER_FEED_CONNECTION_CLOSED,
            onError: WS_ORDER_FEED_CONNECTION_ERROR,
            onMessage: WS_ORDER_FEED_GET_MESSAGE,
            onOpen: WS_ORDER_FEED_CONNECTION_SUCCESS,
            wsSendMessage: WS_ORDER_FEED_SEND_MESSAGE
        }
    ),
    socketMiddleware(WSPathOrders,
        {
            wsInit: WS_ORDER_HISTORY_CONNECTION_START,
            onClose: WS_ORDER_HISTORY_CONNECTION_CLOSED,
            onError: WS_ORDER_HISTORY_CONNECTION_ERROR,
            onMessage: WS_ORDER_HISTORY_GET_MESSAGE,
            onOpen: WS_ORDER_HISTORY_CONNECTION_SUCCESS,
            wsSendMessage: WS_ORDER_HISTORY_SEND_MESSAGE
        }
    )
));

export const store = createStore(rootReducer, enhancer);