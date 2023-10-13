import { FC } from "react";
import { IOrderParams } from "../../services/reducers/orderHistory";
import { OrderFeedCard } from "../order-feed-card/order-feed-card";

export interface IOrderFeedPanel {
    orders: Array<IOrderParams>
    success: boolean;
    total: number;
    totalToday: number;
}

export const OrderFeedPanel: FC<IOrderFeedPanel> = (props) => {
    return (
        <section>
            {props.orders.map((item) => <OrderFeedCard {...item} />)}
        </section>
    );
} 