import { FC } from "react";
import { Params, useParams } from "react-router-dom";

import orderItemInfoStyles from "./order-Item-info.module.css";
import { IOrderParams } from "../../services/reducers/orderHistory";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getTotalCaunt as getTotalCount } from "../../utils/totalCaunt";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { RoundImage } from "../round-image/round-image";
import { IIngredientItem } from "../../services/reducers/ingredients";

export const OrderItemInfo: FC = () => {
    const { ingredients, orderHistory, orderFeed, displayedOrder } = useSelector((state: RootState) => state);
    const { displayedOrderIdFailed, displayedOrderIdRequest, displayedOrderInfo } = displayedOrder;
    const { number }: Readonly<Params<string>> = useParams();
    const numberOrder: number = Number(number);

    if (!numberOrder || !ingredients || !ingredients.ingredients) {
        return null;
    }
    if (!orderHistory && !orderFeed) {
        return null
    }

    let order: IOrderParams | null = orderFeed.orderData?.orders.find((item: IOrderParams) => item.number === numberOrder) || null;
    if (!order) {
        order = orderHistory.orderData?.orders.find((item: IOrderParams) => item.number === numberOrder) || null;
    }

    if (!order) {
        return null
    }

    if (displayedOrderIdRequest && !displayedOrderIdFailed) {
        return <span>{"Загрузка информации о заказе..."}</span>
    }
    if (displayedOrderInfo && !displayedOrderIdFailed && !displayedOrderIdRequest) {
        return (
            <section className={orderItemInfoStyles.wrapper}>
                <div className={`${orderItemInfoStyles.orderNumber} text text_type_digits-default mb-10`}>#{order.number}</div>
                <span className="text text_type_main-medium mb-3">{order.name}</span>
                <span className="text text_type_main-small mb-15">{order.status}</span>
                <span className="text text_type_main-medium mb-6">Состав:</span>
                <div className={`${orderItemInfoStyles.descriptionBlock} mb-10`}>
                    {order.ingredients.map((orderId: string) => {
                        const ingredient: IIngredientItem | undefined = ingredients.ingredients?.get(orderId);
                        if (!ingredient) {
                            return null;
                        }
                        return (
                            <div className={orderItemInfoStyles.ingredientItemInfo}>
                                <div className={orderItemInfoStyles.ingredientItemInfoLeftGroup}>
                                    <RoundImage size={60} src={ingredient.image_mobile} />
                                    <span className="text text_type_main-default">{ingredient.name}</span>
                                </div>
                                <div className={orderItemInfoStyles.ingredientItemInfoRightGroup}>
                                    <span className="text text_type_digits-default">
                                        {`${ingredient.type === "bun" ? 2 : 1} x ${ingredient.price}`}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${orderItemInfoStyles.footer}`}>
                    <span className="text text_color_inactive text_type_main-default">
                        <FormattedDate date={new Date(order.updatedAt)} />
                    </span>
                    <div className={`${orderItemInfoStyles.totalCount} text text_type_digits-default`}>
                        {getTotalCount(order.ingredients, ingredients.ingredients)}
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
        )
    }
    return <span>{"Не удалось получить информацию о заказе!"}</span>
}