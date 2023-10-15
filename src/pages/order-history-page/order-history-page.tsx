import { FC, useEffect } from "react"

import orderHistoryPageStyles from "./order-history-page.module.css";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { WSPathOrders } from "../../services/middleware";
import { wcConnectionStart } from "../../services/actions/orderHistory";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";
import { OrderFeedCard } from "../../components/order-feed-card/order-feed-card";


export const OrderHistoryPage: FC = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: RootState) => state.orderHistory);

    useEffect(() => {
        dispatch(setCurrentMenuProfilePanel(
            {
                menuItem: "menuItemOrderHistory",
                footerText: "В этом разделе вы можете просмотреть свою историю заказов"
            }
        ))
        dispatch(wcConnectionStart({ url: WSPathOrders }));
    }, [dispatch])

    if (!orderData) {
        return null;
    }
  
    return (
        <section className={orderHistoryPageStyles.wrapper}>
            {orderData.orders.map((item) => <OrderFeedCard key={item._id} orderInfo={item} needShowStatus/>).reverse()}
        </section>
    );
}