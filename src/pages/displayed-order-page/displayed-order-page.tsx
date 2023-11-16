import { FC } from "react";

import displayedOrderPageStyles from "./displayed-order-page.module.css";
import { OrderItemInfo } from "../../components/order-Item-info/order-Item-info";

export const DisplayedOrderPage: FC = () => {
    return (
        <div className={displayedOrderPageStyles.orderItemInfo}>
            <OrderItemInfo />
        </div>
    );
}