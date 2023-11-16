import { FC } from "react";

import orderFeedInfoPanelStyles from "./order-feed-info-panel.module.css";
import { IOrderFeedItemParams } from "../../services/reducers/orderFeed";
import { useSelector } from "../../services/hooks";

export const OrderFeedInfoPanel: FC = () => {
    const { orderData }: { orderData: IOrderFeedItemParams | null } = useSelector(state => state.orderFeed);

    if (!orderData) {
        return null;
    }

    return (
        <section className={orderFeedInfoPanelStyles.panelWrapper}>
            <div className={`${orderFeedInfoPanelStyles.statusBar} mb-15`}>
                <div className={orderFeedInfoPanelStyles.staatusBlock}>
                    <span className="mb-6 text text_type_main-medium">Готовы:</span>
                    <div className={orderFeedInfoPanelStyles.deoneItems}>
                        {
                            orderData.orders
                                .filter((item: IOrderShortInfo) => item.status === "done")
                                .map((item: IOrderShortInfo) => <span key={item._id} className="text text_type_digits-default">{item.number}</span>)
                                .slice(0, 5)
                        }
                    </div>
                </div>
                <div className={orderFeedInfoPanelStyles.staatusBlock}>
                    <span className="mb-6 text text_type_main-medium">В работе:</span>
                    {
                        orderData.orders
                            .filter((item: IOrderShortInfo) => item.status !== "done")
                            .map((item: IOrderShortInfo) => <span key={item._id} className="text text_type_digits-default">{item.number}</span>)
                    }
                </div>
            </div>
            <div className={`${orderFeedInfoPanelStyles.orderCountBlock} mb-15`}>
                <span className="mb-6 text text_type_main-medium">Выполнено за все время:</span>
                <span className="text text_type_digits-large">{orderData.total}</span>
            </div>
            <div className={orderFeedInfoPanelStyles.orderCountBlock}>
                <span className="mb-6 text text_type_main-medium">Выполнено за сегодея:</span>
                <span className="text text_type_digits-large">{orderData.totalToday}</span>
            </div>
        </section>
    );
}