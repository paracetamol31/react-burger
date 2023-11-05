import { FC, useEffect } from "react";

import orderFeedPageStyles from "./order-feed-page.module.css";
import { useDispatch } from "../../services/hocks";
import { wcConnectionEnd, wcConnectionStart } from "../../services/actions/orderFeed";
import { setCurrentMenuHeader, orderFeed } from "../../services/actions/header";
import { WSPathOrdersAll } from "../../services/middleware";
import { OrderFeedPanel } from "../../components/order-feed-panel/order-feed-panel";
import { OrderFeedInfoPanel } from "../../components/order-feed-info-panel/order-feed-info-panel";

export const OrderFeedPage: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: orderFeed }));
        dispatch(wcConnectionStart({ url: WSPathOrdersAll }));
        return ()=> {
            dispatch(wcConnectionEnd())
        }
    }, [dispatch])

    return (
        <section className={`${orderFeedPageStyles.pageWrapper} pt-8`}>
            <div className="text text_type_main-large mb-4">Лента заказов</div>
            <div className={orderFeedPageStyles.mainContent}>
                <div className={orderFeedPageStyles.block}>
                    <OrderFeedPanel />
                </div>
                <div className={orderFeedPageStyles.block}>
                    <OrderFeedInfoPanel />
                </div>
            </div>
        </section>
    );
}