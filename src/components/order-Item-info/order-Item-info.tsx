import { FC, useEffect } from "react";
import { Params, useParams } from "react-router-dom";

import orderItemInfoStyles from "./order-Item-info.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IGroupedListPricesItem, getGroupedListPrices, getTotalCount } from "../../utils/priceСalculator";
import { useDispatch, useSelector } from "../../services/hooks";
import { RoundImage } from "../round-image/round-image";
import { IIngredientItem } from "../../services/reducers/ingredients";
import {
    requestOrderInfoByNumber,
    setDisplayedOrderInfo
} from "../../services/actions/displayedOrder";

export const OrderItemInfo: FC = () => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.ingredients);
    const orderHistory = useSelector(state => state.orderHistory);
    const orderFeed = useSelector(state => state.orderFeed);
    const { displayedOrderInfo, displayedOrderIdRequest, displayedOrderIdFailed } = useSelector(state => state.displayedOrder);
    const { number }: Readonly<Params<string>> = useParams();
    const numberOrder: number = Number(number);

    useEffect(() => {
        let order: IOrderShortInfo | null = orderFeed.orderData?.orders.find((item: IOrderShortInfo) => item.number === numberOrder) || null;
        if (!order) {
            order = orderHistory.orderData?.orders.find((item: IOrderShortInfo) => item.number === numberOrder) || null;
        }

        if (order) {
            dispatch(setDisplayedOrderInfo({ displayedOrderInfo: order }));
        } else {
            dispatch(requestOrderInfoByNumber(numberOrder));
        }
    }, [dispatch, numberOrder, orderFeed.orderData?.orders, orderHistory.orderData?.orders]);

    if (displayedOrderIdFailed) {
        return <span className="text text_type_main-medium">{"Не удалось получить информацию о заказе!"}</span>
    }
    if (displayedOrderIdRequest && !displayedOrderIdFailed) {
        return <span className="text text_type_main-medium">{"Загрузка информации о заказе..."}</span>
    }
    if (displayedOrderInfo
        && !displayedOrderIdFailed
        && !displayedOrderIdRequest
        && ingredients) {
        return (
            <section className={orderItemInfoStyles.wrapper}>
                <div className={`${orderItemInfoStyles.orderNumber} text text_type_digits-default mb-10`}>#{displayedOrderInfo.number}</div>
                <span className="text text_type_main-medium mb-3">{displayedOrderInfo.name}</span>
                <span className="text text_type_main-small mb-15">{displayedOrderInfo.status}</span>
                <span className="text text_type_main-medium mb-6">Состав:</span>
                <div className={`${orderItemInfoStyles.descriptionBlock} mb-10`}>
                    {Array.from(getGroupedListPrices(displayedOrderInfo.ingredients, ingredients))
                        .map((orderItem: [string, IGroupedListPricesItem]) => {
                            const ingredient: IIngredientItem | undefined = ingredients?.get(orderItem[0]);
                            if (!ingredient) {
                                return null;
                            }

                            return (
                                <div key={orderItem[0]} className={orderItemInfoStyles.ingredientItemInfo}>
                                    <div className={orderItemInfoStyles.ingredientItemInfoLeftGroup}>
                                        <RoundImage size={60} src={ingredient.image_mobile} />
                                        <span className="text text_type_main-default">{ingredient.name}</span>
                                    </div>
                                    <div className={orderItemInfoStyles.ingredientItemInfoRightGroup}>
                                        <span className="text text_type_digits-default">
                                            {`${orderItem[1].count} x ${orderItem[1].price}`}
                                        </span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className={`${orderItemInfoStyles.footer}`}>
                    <span className="text text_color_inactive text_type_main-default">
                        <FormattedDate date={new Date(displayedOrderInfo.updatedAt)} />
                    </span>
                    <div className={`${orderItemInfoStyles.totalCount} text text_type_digits-default`}>
                        {getTotalCount(displayedOrderInfo.ingredients, ingredients)}
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
        )
    }
    return null;
}