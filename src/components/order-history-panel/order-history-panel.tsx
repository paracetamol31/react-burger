import { FC, useEffect } from "react"

import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { WSPathOrders } from "../../services/middleware";
import { wcConnectionStart } from "../../services/actions/orderHistory";
import { setCurrentMenuProfilePanel } from "../../services/actions/profile";

export const OrderHistoryPanel: FC = () => {
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
    return (
        orderData
            ? <>{JSON.stringify(orderData)}</>
            : null
    );
}