import { FC } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import orderFeedCardStyles from "./order-feed-card.module.css";

export interface OrderFeedCardProps {
    ingredients: Array<string>,
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string
}

export const OrderFeedCard: FC<OrderFeedCardProps> = (props) => {
    return (
        <section className={`${orderFeedCardStyles.orderCard} pl-4 pr-4 pt-6 pb-6`}>
            <div className={`${orderFeedCardStyles.header} text text_type_digits-default mb-6`}>
                <span>#{props.number}</span>
                <span className="text text_color_inactive text_type_main-default">
                    <FormattedDate date={new Date(props.updatedAt)} />
                </span>
            </div>
            <span className="text text_type_main-medium">{props.name}</span>
            <span className="text text_type_digits-default mt-2">{props.status}</span>
        </section>
    );
}