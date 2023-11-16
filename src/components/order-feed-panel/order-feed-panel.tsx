import { FC } from "react";

import orderFeedPanelStyles from "./order-feed-panel.module.css";
import { OrderFeedCard } from "../order-feed-card/order-feed-card";
import { IOrderFeedItemParams } from "../../services/reducers/orderFeed";
import { useSelector } from "../../services/hooks";
import { IIngredientItem } from "../../services/reducers/ingredients";
import { orderValidation } from "../../utils/validation";

export const OrderFeedPanel: FC = () => {
    const { orderData }: { orderData: IOrderFeedItemParams | null } = useSelector(state => state.orderFeed);
    const { ingredients }: { ingredients: Map<string, IIngredientItem> | null } = useSelector(state => state.ingredients);

    if (!orderData || !ingredients) {
        return null;
    }

    return (
        <section className={orderFeedPanelStyles.wrapper}>
            {(orderData.orders
                .filter((orderItem) => orderValidation(orderItem, ingredients)) || [])
                .map((orderItem) => <OrderFeedCard key={orderItem._id} orderInfo={orderItem} />)
            }
        </section>
    );
} 