import { FC } from "react";

import orderFeedPanelStyles from "./order-feed-panel.module.css";
import { OrderFeedCard } from "../order-feed-card/order-feed-card";
import { IOrderFeedItemParams } from "../../services/reducers/orderFeed";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

export const OrderFeedPanel: FC = () => {
    const { orderData }: { orderData: IOrderFeedItemParams | null } = useSelector((state: RootState) => state.orderFeed);

    if (!orderData) {
        return null;
    }

    return (
        <section className={orderFeedPanelStyles.wrapper}>
            {orderData.orders.map((item) => <OrderFeedCard key={item._id} orderInfo={item} />)}
        </section>
    );
} 