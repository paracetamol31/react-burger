import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TApplicationActions, TWSStoreActions } from "../types";

export const WSAddress: string = "wss://norma.nomoreparties.space";
export const WSPathOrdersAll: string = `${WSAddress}/orders/all`;
export const WSPathOrders: string = `${WSAddress}/orders`;

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;

            if (action.type === wsActions.wsInit) {
                socket = new WebSocket(`${action.payload.url}${action.payload.token ? "?token=" + action.payload.token : ""}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: wsActions.onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: wsActions.onError, payload: event });
                };

                socket.onmessage = event => {
                    let parsedData = null;
                    try {
                        parsedData = JSON.parse(event.data);
                    } catch {
                        parsedData = null;
                    }
                    dispatch({ type: wsActions.onMessage, payload: parsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: wsActions.onClose, payload: event });
                };

                if (action.type === wsActions.wsClose) {
                    socket.close();
                }

                if (action.type === wsActions.wsSendMessage) {
                    const message = action.payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
