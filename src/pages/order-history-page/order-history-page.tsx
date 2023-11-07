import { FC, useEffect } from "react"

import orderHistoryPageStyles from "./order-history-page.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { WSPathOrders } from "../../services/middleware";
import { wcConnectionEnd, wcConnectionStart } from "../../services/actions/orderHistory";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";
import { OrderFeedCard } from "../../components/order-feed-card/order-feed-card";


export const OrderHistoryPage: FC = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector(state => state.orderHistory);

    useEffect(() => {
        dispatch(setCurrentMenuProfilePanel(
            {
                menuItem: "menuItemOrderHistory",
                footerText: "В этом разделе вы можете просмотреть свою историю заказов"
            }
        ))
        dispatch(wcConnectionStart({ url: WSPathOrders }));
        return () => {
            dispatch(wcConnectionEnd())
        }
    }, [dispatch])

    if (!orderData) {
        return null;
    }

    return (
        <section className={orderHistoryPageStyles.wrapper}>
            {orderData.orders.map((item) => <OrderFeedCard key={item._id} orderInfo={item} needShowStatus />).reverse()}
        </section>
    );
}