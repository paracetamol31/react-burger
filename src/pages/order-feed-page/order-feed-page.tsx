import { FC, useEffect } from "react";

import orderFeedPageStyles from "./order-feed-page.module.css";
import { useDispatch, useSelector } from "../../services/hocks";
import { wcConnectionStart } from "../../services/actions/orderFeed";
import { setCurrentMenuHeader, orderFeed } from "../../services/actions/header";
import { WSPathOrdersAll } from "../../services/middleware";
import { RootState } from "../../services/types";
import { OrderFeedPanel } from "../../components/order-feed-panel/order-feed-panel";
import { OrderFeedInfoPanel } from "../../components/order-feed-info-panel/order-feed-info-panel";

export const OrderFeedPage: FC = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: RootState) => state.orderFeed);
    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: orderFeed }));
        dispatch(wcConnectionStart({ url: WSPathOrdersAll }));
    }, [dispatch])

    if (!orderData) {
        return null;
    }

    return (
        <section className={orderFeedPageStyles.pageWrapper}>
            <div className={orderFeedPageStyles.header}></div>
            <div className={orderFeedPageStyles.mainContent}>
                <OrderFeedPanel {...orderData} />
                <OrderFeedInfoPanel/>
            </div>
        </section>
    );
}